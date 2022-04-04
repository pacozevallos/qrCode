import { Component, Inject, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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

  tipoPrecio = [
    'Individual',
    'Múltiple'
  ];
  individual = true;
  multiple: boolean;

  categoria: string;

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
      tipoPrecio: [this.data.item.tipoPrecio, Validators.required],
      image: ['', FileValidator.maxContentSize(this.maxSize)],
      imageName: [''],
      fechaEdicion: [firebase.firestore.Timestamp.fromDate(new Date())]
    });

    if (this.data.item.tipoPrecio === 'Individual') {
      this.individual = true;
      this.multiple = false;
    }


    if (this.data.item.tipoPrecio === 'Múltiple') {
      this.individual = false;
      this.multiple = true;
      this.formItem.removeControl('precio');
      this.formItem.removeControl('precioDescuento');
      this.formItem.addControl('precios', this.fb.array([]));
      this.data.item.precios.forEach(element => {
        const arrayPrecios = this.formItem.controls.precios as FormArray;
        arrayPrecios.push(
          this.fb.group({
            variante: [element.variante, Validators.required],
            precio: [element.precio, Validators.required],
          })
        );
      });
    }

    this.formItem.get('tipoPrecio').valueChanges.subscribe( res => {

      if (res === 'Individual') {
        this.individual = true;
        this.multiple = false;
        this.formItem.removeControl('precios');
        this.formItem.addControl('precio', this.fb.control('', Validators.required));
        this.formItem.addControl('precioDescuento', this.fb.control(''));
      }

      if (res === 'Múltiple') {
        this.individual = false;
        this.multiple = true;
        this.formItem.removeControl('precio');
        this.formItem.removeControl('precioDescuento');
        this.formItem.addControl('precios', this.fb.array([
          this.fb.group({
            variante: ['', Validators.required],
            precio: ['', Validators.required]
          })
        ]));
        const arrayPrecios = this.formItem.controls.precios as FormArray;
        this.formItem.controls.precios.valueChanges.subscribe( multiple => {
          for (const i in multiple) {
            arrayPrecios.at(+i).get('variante').setValidators(Validators.required);
            arrayPrecios.at(+i).get('precio').setValidators(Validators.required);
          }
        });
      }
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
    const item = this.formItem.value;
    ['image', 'imageName'].forEach(e => delete item[e]);
    this.afs.doc('negocios/' + this.data.idNegocio).collection('items').doc(this.data.item.id).update(item)
    .then(() => {
      this.bottomSheetRef.dismiss();
      console.log('item actualizado');
    });
  }

  agregarPrecio() {
    (this.formItem.controls.precios as FormArray).push(
      this.fb.group({
        variante: [''],
        precio: [''],
      })
    );
  }

  eliminarPrecio(index: number): void {
    (this.formItem.controls.precios as FormArray).removeAt(index);
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
    const dialogRef = this.dialog.open(CrearCategoriaItemComponent, {
      data: {
        idNegocio: this.data.idNegocio,
        categoria: this.categoria
      }
    });
    dialogRef.afterClosed().subscribe( result => {
      console.log(result);
      this.formItem.get('categoria').setValue(result);
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

          const item = this.formItem.value;
          const image = this.downloadURL;
          const imageName = this.nameItem;
          const newItem = { ...item, image, imageName };
          this.itemRef.update(newItem);

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
