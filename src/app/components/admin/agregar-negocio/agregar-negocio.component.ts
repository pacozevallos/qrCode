import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
// import firebase from 'firebase/app';
import * as firebase from 'firebase/app';
import { FileValidator } from 'ngx-material-file-input';
import { AngularFireStorage } from '@angular/fire/storage';
import { base64StringToBlob } from 'blob-util';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agregar-negocio',
  templateUrl: './agregar-negocio.component.html',
  styleUrls: ['./agregar-negocio.component.scss']
})
export class AgregarNegocioComponent implements OnInit {

  formNegocio: FormGroup;
  idNegocio: string;
  loading = false;
  negocioRef: any;

  tiposNegocio = [
    'Restaurante',
    'Restobar',
    'Cafetería',
    'Heladería',
    'Juguería',
    'Discoteca',
    'Pub',
    'Bar',
  ];

  redesSociales = [
    {
      nombre: 'Tripadvisor',
      icon: 'brand-tripadvisor'
    },
    {
      nombre: 'TikTok',
      icon: 'brand-tiktok'
    },
    {
      nombre: 'Instagram',
      icon: 'brand-instagram'
    },
    {
      nombre: 'Facebook',
      icon: 'brand-facebook'
    },
    {
      nombre: 'WhatsApp',
      icon: 'brand-whatsapp'
    },
    {
      nombre: 'Youtube',
      icon: 'brand-youtube'
    },
    {
      nombre: 'Linkedin',
      icon: 'brand-linkedin'
    },
    {
      nombre: 'Twitter',
      icon: 'brand-twitter'
    },
  ];

  // downloadURL: Observable<string>;

  public qrCodeData = '';

  @ViewChild('parent') parent: ElementRef;

  selectedFile: FileList | null;
  nameItem: any;
  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;
  readonly maxSize = 1048576 * 5;
  actualSize: any;

  constructor(
    private bottomSheetRef: MatBottomSheetRef<AgregarNegocioComponent>,
    private fb: FormBuilder,
    private afs: AngularFirestore,
    private storage: AngularFireStorage,
    private router: Router
  ) {

    // this.idNegocio = this.afs.collection('negocios').ref.doc().id;
    // console.log(this.idNegocio);

    this.negocioRef = this.afs.collection('negocios').ref.doc();
    console.log(this.negocioRef.id);

    this.qrCodeData = `https://qrcode-3b121.web.app/negocio/${this.negocioRef.id}`;
    console.log(this.qrCodeData);

  }

  ngOnInit(): void {
    const user = firebase.default.auth().currentUser;

    this.formNegocio = this.fb.group({
      nombre: ['', Validators.required],
      // imageLogo: ['', FileValidator.maxContentSize(this.maxSize)],
      tipo: [''],
      direccion: ['', Validators.required],
      categorias: new FormArray([]),
      redes: this.fb.array([
        // this.fb.group({
        //   nombre: ['Facebook'],
        //   url: [''],
        //   icon: ['Facebook']
        // })
      ]),
      id: [this.negocioRef.id, Validators.required],
      autorId: [user.uid],
      fechaCreacion: [firebase.default.firestore.Timestamp.fromDate(new Date())]
    });

    // const arrayRedes = this.formNegocio.controls.redes as FormArray;

    // this.formNegocio.addControl('redes', this.fb.array([
    //   this.fb.group({
    //     nombre: ['Facebook'],
    //     url: [''],
    //     icon: ['']
    //   })
    // ]));

    this.formNegocio.controls.redes.valueChanges.subscribe( redes => {
      const control = this.formNegocio.controls.redes as FormArray;
      for (const i in redes) {
        control.at(+i).get('nombre').valueChanges.subscribe( res => {
          const red = this.redesSociales.find( find => find.nombre === res);
          control.at(+i).get('icon').setValue(red.icon);
        });
      }
    });

  }

  onSubmit() {
    if (this.formNegocio.valid) {
      this.loading = true;
      // this.crearItem();
      this.uploadQrCodeAndCrearNegocio();
    } else {
      this.validateAllFormFields(this.formNegocio);
    }
  }

  crearItem() {
    this.afs.doc('negocios/' + this.idNegocio).set(this.formNegocio.value)
    .then(() => {
      this.bottomSheetRef.dismiss();
    });
  }

  agregarRed() {
    (this.formNegocio.controls.redes as FormArray).push(
      this.fb.group({
        nombre: [''],
        url: [''],
        icon: ['']
      })
    );
  }

  eliminarRed(index: number): void {
    (this.formNegocio.controls.redes as FormArray).removeAt(index);
  }

  saveImageQrCode() {
    const canvas = document.getElementsByTagName('canvas');
    const dataURL = canvas[0].toDataURL();
    const myBase64 = dataURL.split(',');
    console.log(myBase64[1]);

    const contentType = 'image/png';
    const b64Data = myBase64[1];
    const myBlob = base64StringToBlob(b64Data, contentType);

    const filePath = 'myPicture1.png';
    const ref = this.storage.ref(filePath);
    ref.put(myBlob);
  }

  // mySet() {
  //   const canvas = document.getElementById('parent') as HTMLCanvasElement;
  //   const img = document.createElement('img');
  //   canvas.toBlob( (blob) => {
  //     img.src = URL.createObjectURL(blob);
  //     console.log(blob);
  //   }, 'image/png');
  // }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  uploadQrCodeAndCrearNegocio() {

    const canvas = document.getElementsByTagName('canvas');
    const dataURL = canvas[0].toDataURL();
    const myBase64 = dataURL.split(',');
    // console.log(myBase64[1]);

    const contentType = 'image/png';
    const b64Data = myBase64[1];
    const myBlob = base64StringToBlob(b64Data, contentType);

    const filePath = `imagesQrCodes/${this.negocioRef.id}.png`;
    const ref = this.storage.ref(filePath);
    const task = ref.put(myBlob);


    // this.uploadPercent = task.percentageChanges();
    task.snapshotChanges().pipe(
      finalize(() => {
        ref.getDownloadURL().toPromise().then( (url) => {
          this.downloadURL = url;
          this.negocioRef.set(this.formNegocio.value);

          this.negocioRef.set({
            qrCodeImage: this.downloadURL,
            qrCodeImageName: filePath,
          }, {merge: true});
          this.router.navigate(['/admin/listaNegocios']);
          this.bottomSheetRef.dismiss();
          console.log( this.downloadURL );
        }).catch(err => { console.log(err); } );
      })
    )
    .subscribe();
  }

  cancelar() {
    this.bottomSheetRef.dismiss();
  }

}
