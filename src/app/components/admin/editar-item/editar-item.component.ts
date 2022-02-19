import { Component, Inject, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import firebase from 'firebase/app';
import { FileValidator } from 'ngx-material-file-input';
import { Observable, merge } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { Item } from 'src/app/classes/item';
import { Negocio } from 'src/app/classes/negocio';
import { CrearCategoriaItemComponent } from '../crear-categoria-item/crear-categoria-item.component';

@Component({
  selector: 'app-editar-item',
  templateUrl: './editar-item.component.html',
  styleUrls: ['./editar-item.component.scss']
})
export class EditarItemComponent implements OnInit {

  formItem: FormGroup;
  idItem: string;
  loading = false;
  negocio;
  categorias;
  itemRef: any;


  selectedFile: FileList | null;
  nameItem: any;
  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;
  readonly maxSize = 1048576 * 5;
  actualSize: any;

  constructor(
    private bottomSheetRef: MatBottomSheetRef<EditarItemComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    private fb: FormBuilder,
    private afs: AngularFirestore,
    private storage: AngularFireStorage,
    public dialog: MatDialog
  ) {
    // this.itemRef = this.afs.collection('negocios/').doc(this.data.id).collection('items').ref.doc();
    // console.log(this.itemRef.id);
  }

  ngOnInit(): void {
    console.log(this.data);
    // this.categorias = this.data.categorias,

    // traer solo categorias en tiempo real
    this.afs.doc('negocios/' + this.data.idNegocio).valueChanges().subscribe( (res: Negocio) => {
      this.categorias = res.categorias;
      console.log(res);
    });

    this.formItem = this.fb.group({
      id: [ this.data.item.id ],
      categoria: [ this.data.item.categoria, Validators.required],
      nombre: [this.data.item.nombre, Validators.required],
      descripcion: [this.data.item.descripcion],
      precio: [this.data.item.precio, Validators.required],
      precioDescuento: [this.data.item.precioDescuento],
      image: ['', FileValidator.maxContentSize(this.maxSize)],
      imageName: [''],
      fechaEdicion: [firebase.firestore.Timestamp.fromDate(new Date())]
    });

  }

  onSubmit() {
    if (this.formItem.valid) {
      this.loading = true;
      if (this.formItem.get('image').value === '') {
        this.guardarCambios();
      } else {
        this.uploadFileCrearItem();
      }
    } else {
      this.validateAllFormFields(this.formItem);
    }
  }

  guardarCambios() {
    // this.afs.doc('items/' + this.idItem).set(this.formItem.value)
    this.afs.doc('negocios/' + this.data.idNegocio).collection('items').doc(this.data.item.id).update({
      categoria: this.formItem.value.categoria,
      nombre: this.formItem.value.nombre,
      descripcion: this.formItem.value.descripcion,
      precio: this.formItem.value.precio,
      precioDescuento: this.formItem.value.precioDescuento,
      fechaEdicion: this.formItem.value.fechaEdicion
    })
    .then(() => {
      this.bottomSheetRef.dismiss();
      console.log('item actualizado');
    });
  }

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

  openModalCrearCategoriaItem() {
    this.dialog.open(CrearCategoriaItemComponent, {
      data: this.data
    });
  }


  detectFiles(event) {
    this.selectedFile = event.target.files[0];
    this.nameItem = event.target.files[0].name;
    console.log(this.nameItem);
  }



  uploadFileCrearItem() {

    this.itemRef = this.afs.doc('negocios/' + this.data.idNegocio).collection('items').doc(this.data.item.id);

    // this.itemRef = this.afs.collection('negocios/').doc(this.data.id).collection('items').ref.doc();
    // console.log(this.itemRef.id);

    const file = this.selectedFile;
    const filePath = `imagesItems/${this.data.idNegocio}/${this.data.item.id}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);

    this.uploadPercent = task.percentageChanges();
    task.snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().toPromise().then( (url) => {
          this.downloadURL = url;

          // const objectItem = this.formItem.value;
          // delete objectItem.image;

          // this.itemRef.set(objectItem);
          this.itemRef.update({
            categoria: this.formItem.value.categoria,
            nombre: this.formItem.value.nombre,
            descripcion: this.formItem.value.descripcion,
            precio: this.formItem.value.precio,
            precioDescuento: this.formItem.value.precioDescuento,
            fechaEdicion: this.formItem.value.fechaEdicion,
            image: this.downloadURL,
            imageName: this.nameItem,
          });
          this.bottomSheetRef.dismiss();
          console.log( this.downloadURL );
        }).catch(err => { console.log(err); } );
      })
    )
    .subscribe();
  }


  errorImagen() {
    return this.formItem.controls.image.hasError('required') ? 'La imagen es necesaria' :
    this.formItem.controls.image.hasError('maxContentSize') ? 'El peso no debe exceder los 5 MB' : '';
  }

  cancelar() {
    this.bottomSheetRef.dismiss();
  }

}
