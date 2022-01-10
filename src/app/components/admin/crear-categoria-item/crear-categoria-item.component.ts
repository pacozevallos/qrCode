import { Component, Inject, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Negocio } from 'src/app/classes/negocio';
// import { arrayUnion } from "firebase/firestore";
import firebase from 'firebase/app';

@Component({
  selector: 'app-crear-categoria-item',
  templateUrl: './crear-categoria-item.component.html',
  styleUrls: ['./crear-categoria-item.component.scss']
})
export class CrearCategoriaItemComponent implements OnInit {

  formCategoria: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private afs: AngularFirestore,
    @Inject(MAT_DIALOG_DATA) public data: Negocio,
    private dialogRef: MatDialogRef<CrearCategoriaItemComponent>,
  ) { }

  ngOnInit(): void {
    console.log(this.data.id);

    this.formCategoria = this.fb.group({
      // categorias: new FormArray([
      //   new FormControl('', [Validators.required])
      // ]),
      categoria: ['', Validators.required]
    });
  }

  agregarCategoria() {
    (this.formCategoria.controls.categorias as FormArray).push(
      new FormControl('', [Validators.required])
    );
  }

  eliminarCategoria(index: number): void {
    (this.formCategoria.controls.categorias as FormArray).removeAt(index);
  }

  onSubmit() {
    if (this.formCategoria.valid) {
      this.updateCategorias();
      this.loading = true;
    } else {
      this.validateAllFormFields(this.formCategoria);
    }
  }

  updateCategorias() {
    this.afs.collection('negocios').doc(this.data.id).update({
      // categorias: arrayUnion(this.formCategoria.value.categorias)
      categorias: firebase.firestore.FieldValue.arrayUnion(this.formCategoria.value.categoria)
    })
    .then( () => {
      this.dialogRef.close();
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
