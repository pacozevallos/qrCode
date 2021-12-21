import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-agregar-negocio',
  templateUrl: './agregar-negocio.component.html',
  styleUrls: ['./agregar-negocio.component.scss']
})
export class AgregarNegocioComponent implements OnInit {

  formNegocio: FormGroup;
  idNegocio: string;
  loading = false;

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

  constructor(
    private bottomSheetRef: MatBottomSheetRef<AgregarNegocioComponent>,
    private fb: FormBuilder,
    private afs: AngularFirestore
  ) {
    this.idNegocio = this.afs.collection('negocios').ref.doc().id;
    console.log(this.idNegocio);
  }

  ngOnInit(): void {
    this.formNegocio = this.fb.group({
      nombre: ['', Validators.required],
      tipo: ['', Validators.required],
      direccion: ['', Validators.required],
      categorias: new FormArray([]),
      id: [this.idNegocio, Validators.required],
      fechaCreacion: [firebase.default.firestore.Timestamp.fromDate(new Date())]
    });
  }

  onSubmit() {
    if (this.formNegocio.valid) {
      this.loading = true;
      this.crearItem();
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

}
