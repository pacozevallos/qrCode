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
    private router: Router,
    private dialog: MatDialog,
    private ds: DataService
  ) {

    // this.idNegocio = this.afs.collection('negocios').ref.doc().id;
    // console.log(this.idNegocio);

    this.negocioRef = this.afs.collection('negocios').ref.doc();
    console.log(this.negocioRef.id);

    this.qrCodeData = `https://taaripay.com/negocio/${this.negocioRef.id}`;
    console.log(this.qrCodeData);

  }

  ngOnInit(): void {
    const user = firebase.default.auth().currentUser;
    this.redesSociales = this.ds.redesSociales;
    this.tiposNegocio = this.ds.tiposNegocio;

    this.formNegocio = this.fb.group({
      nombre: ['', Validators.required],
      numeroWhatsApp: ['', [Validators.pattern('[0-9]*'), Validators.minLength(9), Validators.maxLength(9)]],
      direccion: [''],
      tipo: [''],
      color: [ this.color, Validators.required ],
      categorias: new FormArray([]),
      redes: this.fb.array([]),
      id: [this.negocioRef.id, Validators.required],
      autorId: [user.uid],
      fechaCreacion: [firebase.default.firestore.Timestamp.fromDate(new Date())]
    });

    this.formNegocio.controls.redes.valueChanges.subscribe( redes => {
      const control = this.formNegocio.controls.redes as FormArray;
      for (const i in redes) {
        control.at(+i).get('nombre').valueChanges.subscribe( res => {
          const red = this.ds.redesSociales.find( find => find.nombre === res);
          control.at(+i).get('icon').setValue(red.icon);
        });
      }
    });


    this.filteredOptions = this.formNegocio.get('tipo').valueChanges
      .pipe(
        startWith(''),
        map(value => this.filter(value))
      );

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

}
