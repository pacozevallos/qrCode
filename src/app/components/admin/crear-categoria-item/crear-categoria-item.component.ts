import { Component, Inject, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { UntypedFormArray, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogRef as MatDialogRef, MAT_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Negocio } from 'src/app/classes/negocio';
// import { arrayUnion } from "firebase/firestore";
import firebase from 'firebase/compat/app';

export interface DialogData {
  idNegocio: string;
  categoria: string;
}

@Component({
  selector: 'app-crear-categoria-item',
  templateUrl: './crear-categoria-item.component.html',
  styleUrls: ['./crear-categoria-item.component.scss']
})
export class CrearCategoriaItemComponent implements OnInit {

  formCategoria: UntypedFormGroup;
  loading = false;

  constructor(
    public dialogRef: MatDialogRef<CrearCategoriaItemComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private fb: UntypedFormBuilder,
    private afs: AngularFirestore,
  ) { }

  ngOnInit(): void {
    console.log(this.data);

    this.formCategoria = this.fb.group({
      // categorias: new FormArray([
      //   new FormControl('', [Validators.required])
      // ]),
      categoria: [this.data.categoria, Validators.required]
    });
  }

  agregarCategoria() {
    (this.formCategoria.controls.categorias as UntypedFormArray).push(
      new UntypedFormControl('', [Validators.required])
    );
  }

  eliminarCategoria(index: number): void {
    (this.formCategoria.controls.categorias as UntypedFormArray).removeAt(index);
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
    this.afs.collection('negocios').doc(this.data.idNegocio).update({
      // categorias: arrayUnion(this.formCategoria.value.categorias)
      categorias: firebase.firestore.FieldValue.arrayUnion(this.formCategoria.value.categoria)
    })
    .then( () => {
      this.dialogRef.close(this.formCategoria.value.categoria);
      // this.dialogRef.afterClosed().subscribe( data => {
      //   console.log(data);
      // });
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


}
