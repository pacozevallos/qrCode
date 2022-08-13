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
import { ColorEvent } from 'ngx-color';
import { ColorComponent } from '../../public/color/color.component';
import { MatDialog } from '@angular/material/dialog';
import { DataService } from 'src/app/services/data.service';
import { map, startWith } from 'rxjs/operators';
import { IdValidatorService } from 'src/app/services/id-validator.service';

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
  redesSociales = [];
  tiposNegocio = [];
  color = '#1456D8';
  filteredOptions: Observable<string[]>;
  negocioId: string;
  hrefCurrent = window.location.origin;

  public qrCodeData = '';
  paises = [];

  @ViewChild('parent') parent: ElementRef;

  selectedFile: FileList | null;
  nameItem: any;
  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;
  readonly maxSize = 1048576 * 5;
  actualSize: any;
  hostname = window.location.origin;

  constructor(
    private bottomSheetRef: MatBottomSheetRef<AgregarNegocioComponent>,
    private fb: FormBuilder,
    private afs: AngularFirestore,
    private storage: AngularFireStorage,
    private router: Router,
    private dialog: MatDialog,
    private ds: DataService,
    private idValidator: IdValidatorService
  ) {

    // this.negocioRef = this.afs.collection('negocios').doc(this.negocioId);
    // console.log(this.negocioRef.id);

  }

  ngOnInit(): void {
    const user = firebase.default.auth().currentUser;
    this.paises = this.ds.paises;
    console.log(this.hostname);

    this.formNegocio = this.fb.group({
      nombre: ['', Validators.required],
      id: ['', [Validators.required], [this.idValidator]],
      pais: ['Perú', Validators.required],
      moneda: ['PEN', Validators.required],
      prefijo: ['51', Validators.required],
      numeroWhatsApp: ['', [Validators.required, Validators.pattern('[0-9]*'), Validators.minLength(9), Validators.maxLength(9)]],
      color: ['#1456D8', Validators.required],
      autorId: [user.uid],
      fechaCreacion: [firebase.default.firestore.Timestamp.fromDate(new Date())]
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

    this.formNegocio.get('pais').valueChanges.subscribe( res => {
      const paisSelect = this.paises.find( find => find.nombre === res);
      this.formNegocio.get('prefijo').setValue(paisSelect.prefijo);
      this.formNegocio.get('moneda').setValue(paisSelect.moneda);
    });

    // this.formNegocio.controls.redes.valueChanges.subscribe( redes => {
    //   const control = this.formNegocio.controls.redes as FormArray;
    //   for (const i in redes) {
    //     control.at(+i).get('nombre').valueChanges.subscribe( res => {
    //       const red = this.ds.redesSociales.find( find => find.nombre === res);
    //       control.at(+i).get('icon').setValue(red.icon);
    //     });
    //   }
    // });


    // this.filteredOptions = this.formNegocio.get('tipo').valueChanges
    //   .pipe(
    //     startWith(''),
    //     map(value => this.filter(value))
    //   );

  }

  private filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.tiposNegocio.filter(option => option.toLowerCase().includes(filterValue));
  }

  handleChange($event: ColorEvent) {
    console.log($event.color);
  }

  openModalCrearColor() {
    const dialogRef = this.dialog.open(ColorComponent, {
      panelClass: 'dialogColor',
      data: this.color,
      // disableClose: true
    });
    dialogRef.afterClosed().subscribe( result => {
      console.log(result);
      if ( result !== undefined) {
        this.color = result;
        this.formNegocio.get('color').setValue(this.color);
      }
    });
    // dialogRef.componentInstance.color.subscribe( res => {
    //   console.log(res);
    //   this.color = res;
    //   this.formNegocio.get('color').setValue(this.color);
    // })
  }

  onSubmit() {
    if (this.formNegocio.valid) {
      this.loading = true;
      this.crearItem();
      // this.uploadQrCodeAndCrearNegocio();
    } else {
      this.validateAllFormFields(this.formNegocio);
    }
  }

  crearItem() {
    this.afs.doc('negocios/' + this.negocioId).set(this.formNegocio.value)
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

    const filePath = `imagesQrCodes/${this.negocioId}.png`;
    const ref = this.storage.ref(filePath);
    const task = ref.put(myBlob);

    // this.uploadPercent = task.percentageChanges();
    task.snapshotChanges().pipe(
      finalize(() => {
        ref.getDownloadURL().toPromise().then( (url) => {
          this.downloadURL = url;
          const negocioRef = this.afs.collection('negocios').doc(this.negocioId);
          negocioRef.set(this.formNegocio.value);

          negocioRef.set({
            qrCodeImage: this.downloadURL,
            qrCodeImageName: filePath,
          }, {merge: true});
          // this.router.navigate(['/admin/listaNegocios']);
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

  detectFiles(event) {
    this.selectedFile = event.target.files[0];
    this.nameItem = event.target.files[0].name;
    console.log(this.nameItem);
  }

  errorNombreNegocio() {
    return this.formNegocio.controls.nombre.hasError('required') ? 'Ingresa un nombre' : '';
  }

  errorPais() {
    return this.formNegocio.controls.pais.hasError('required') ? 'Seleccione un país' : '';
  }

  errorWhatsApp() {
    return this.formNegocio.controls.numeroWhatsApp.hasError('required') ? 'Ingresa un número' :
    this.formNegocio.controls.numeroWhatsApp.hasError('pattern') ? 'Solo se admiten números.' :
    this.formNegocio.controls.numeroWhatsApp.hasError('minlength') ? 'Mínimo 9 caracteres' :
    this.formNegocio.controls.numeroWhatsApp.hasError('maxlength') ? 'No debe exceder 9 caracteres' : '';
  }

  errorImagen() {
    return this.formNegocio.controls.image.hasError('required') ? 'La imagen es necesaria' :
    this.formNegocio.controls.image.hasError('maxContentSize') ? 'El peso no debe exceder los 5 MB' : '';
  }

  errorId() {
    return this.formNegocio.controls.id.hasError('required') ? 'Ingresa una url' :
    this.formNegocio.controls.id.invalid ? 'Esta url ya está tomada ' : '';
  }


}
