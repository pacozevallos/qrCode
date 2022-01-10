import { Component, Inject, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import firebase from 'firebase/app';
import { Item } from 'src/app/classes/item';
import { Negocio } from 'src/app/classes/negocio';
import { CrearCategoriaItemComponent } from '../crear-categoria-item/crear-categoria-item.component';

@Component({
  selector: 'app-crear-item',
  templateUrl: './crear-item.component.html',
  styleUrls: ['./crear-item.component.scss']
})
export class CrearItemComponent implements OnInit {

  formItem: FormGroup;
  idItem: string;
  loading = false;
  negocio;
  categorias;

  constructor(
    private bottomSheetRef: MatBottomSheetRef<CrearItemComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: Negocio,
    private fb: FormBuilder,
    private afs: AngularFirestore,
    public dialog: MatDialog
  ) {
    // this.idItem = this.afs.collection('items').ref.doc().id;
    // console.log(this.idItem);
  }

  ngOnInit(): void {
    console.log(this.data.id);

    this.formItem = this.fb.group({
      categoria: ['', Validators.required],
      nombre: ['', Validators.required],
      descripcion: [''],
      precio: ['', Validators.required],
      // precioDescuento: [''],
      publicado: [false],
      fechaCreacion: [firebase.firestore.Timestamp.fromDate(new Date())]
    });

    // traer solo categorias en tiempo real
    this.afs.doc('negocios/' + this.data.id).valueChanges().subscribe( (res: Negocio) => {
      this.categorias = res.categorias;
    });
  }


  onSubmit() {
    if (this.formItem.valid) {
      this.loading = true;
      this.crearItem();
    } else {
      this.validateAllFormFields(this.formItem);
    }
  }

  crearItem() {
    // this.afs.doc('items/' + this.idItem).set(this.formItem.value)
    this.afs.doc('negocios/' + this.data.id).collection('items').add(this.formItem.value)
    .then(() => {
      this.bottomSheetRef.dismiss();
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

}
