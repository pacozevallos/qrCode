import { Component, Inject, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogRef as MatDialogRef, MAT_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar as MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Negocio } from 'src/app/classes/negocio';
import { FirebaseService } from 'src/app/services/firebase.service';
import { IdValidatorService } from 'src/app/services/id-validator.service';
import { finalize } from 'rxjs/operators';
import { base64StringToBlob } from 'blob-util';
import { Timestamp } from '@angular/fire/firestore';

@Component({
  selector: 'app-duplicar-negocio',
  templateUrl: './duplicar-negocio.component.html',
  styleUrls: ['./duplicar-negocio.component.scss']
})
export class DuplicarNegocioComponent implements OnInit {

  formNegocio: UntypedFormGroup;
  loading: boolean;
  negocioId: string;

  public qrCodeData = '';

  idsArray = [];
  downloadURL: Observable<string>;

  negocioIdPrev: string;
  hostname = window.location.origin;

  constructor(
    private dialogRef: MatDialogRef<DuplicarNegocioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackBar: MatSnackBar,
    private afs: AngularFirestore,
    private storage: AngularFireStorage,
    private fs: FirebaseService,
    private router: Router,
    private fb: UntypedFormBuilder,
    private idValidator: IdValidatorService
  ) {
    this.afs.collection('negocios').valueChanges().subscribe( res => {
      this.idsArray = res.map((fil: Negocio) => fil.id);
    });
  }

  ngOnInit(): void {

    this.negocioIdPrev = this.data.id;

    this.formNegocio = this.fb.group({
      nombre: [`${this.data.nombre}2`, [Validators.required]],
      id: [`${this.data.id}2`, [Validators.required], [this.idValidator]],
      fechaCreacion: [Timestamp.now()]
    });

    this.formNegocio.get('nombre').valueChanges.subscribe( res => {
      const negocioIdSpace = res.replace(/ /g, '-');
      this.negocioId = negocioIdSpace.toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '');
      this.formNegocio.get('id').setValue(this.negocioId);
      this.qrCodeData = `${this.hostname}/negocio/${this.negocioId}`;
    });

    this.formNegocio.get('id').valueChanges.subscribe( res => {
      const negocioIdSpace = res.replace(/ /g, '-');
      this.negocioId = negocioIdSpace.toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '');
      this.formNegocio.get('id').patchValue(this.negocioId, {emitEvent: false});
    });

  }


  onSubmit() {
    if (this.formNegocio.valid) {
      this.loading = true;
      this.duplicarNegocio();
    } else {
      this.validateAllFormFields(this.formNegocio);
    }
  }


  duplicarNegocio() {

    const negocioPrev = this.data;
    ['nombre', 'id', 'fechaCreacion', 'qrCodeImage', 'qrCodeImageName', 'imageLogo', 'imageLogoName'].forEach(e => delete negocioPrev[e]);
    const dataForm = this.formNegocio.value;
    const newDoc = { ...negocioPrev, ...dataForm};
    console.log(newDoc);

    return this.afs.collection('negocios').doc(this.negocioId).set(newDoc)
      .then(() => {
        console.log('negocio copiado');
        this.afs.collection('negocios').doc(this.negocioIdPrev).collection('items').valueChanges().subscribe(data => {
          const items = data;
          console.log(items);


          // this.storage.ref(`imagesItems/${this.negocio.id}`).listAll().subscribe( response => {
          //   console.log(response.items);
          //   response.items.forEach( itemRef => {
          //     itemRef.getDownloadURL().then( url => {
          //       const imgUrl = url.replace(this.negocio.id, 'novotel-cusco');
          //       console.log(imgUrl);
          //     });
          //   });
          // });


          items.forEach(item => {

            const image = item.image.replace(this.negocioIdPrev, this.negocioId);
            console.log(image);
            const newItem = { ...item, image};

            this.afs.collection('negocios').doc(this.negocioId).collection('items').doc(item.id).set(newItem)
              .then(() => {
                console.log('item copiado');
                this.dialogRef.close();
                this.router.navigate(['/admin']);
              });

          });
        });
    });

  }



  validateAllFormFields(formGroup: UntypedFormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof UntypedFormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof UntypedFormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  // uploadQrCodeAndCrearNegocio() {

  //   const canvas = document.getElementsByTagName('canvas');
  //   const dataURL = canvas[0].toDataURL();
  //   const myBase64 = dataURL.split(',');

  //   const contentType = 'image/png';
  //   const b64Data = myBase64[1];
  //   const myBlob = base64StringToBlob(b64Data, contentType);

  //   const filePath = `imagesQrCodes/${this.negocioId}.png`;
  //   const ref = this.storage.ref(filePath);
  //   const task = ref.put(myBlob);

  //   task.snapshotChanges().pipe(
  //     finalize(() => {
  //       ref.getDownloadURL().toPromise().then( (url) => {
  //         this.downloadURL = url;

  //         const negocioRef = this.afs.collection('negocios').doc(this.negocioId);
  //         negocioRef.set(this.formNegocio.value);

  //         negocioRef.set({
  //           qrCodeImage: this.downloadURL,
  //           qrCodeImageName: filePath,
  //         }, {merge: true});
  //         this.dialogRef.close();
  //         console.log( this.downloadURL );
  //       }).catch(err => { console.log(err); } );
  //     })
  //   )
  //   .subscribe();
  // }


  cancelar() {
    this.dialogRef.close();
  }

  errorNombreNegocio() {
    return this.formNegocio.controls.nombre.hasError('required') ? 'Ingresa un nombre' : '';
  }

  errorId() {
    return this.formNegocio.controls.id.hasError('required') ? 'Ingresa una url' :
    this.formNegocio.controls.id.invalid ? 'Esta url ya está tomada ' : '';
  }

}
