import { Component, Inject, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { Negocio } from 'src/app/classes/negocio';

@Component({
  selector: 'app-adicionales',
  templateUrl: './adicionales.component.html',
  styleUrls: ['./adicionales.component.scss']
})
export class AdicionalesComponent implements OnInit {

  formConfiguraciones: FormGroup;
  loading: boolean;

  constructor(
    private bottomSheetRef: MatBottomSheetRef<AdicionalesComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: Negocio,
    private fb: FormBuilder,
    private afs: AngularFirestore
  ) { }

  ngOnInit(): void {
    this.formConfiguraciones = this.fb.group({
      reglas: this.fb.array([
        // this.fb.control('')
      ]),
    });

    const arrayReglas = this.formConfiguraciones.controls.reglas as FormArray;
    if (typeof this.data.reglas === 'undefined' ) {
      arrayReglas.push(
        this.fb.control('')
      );
    }
    if (this.data.reglas?.length >= 1 ) {
      this.data.reglas.forEach( element => {
        arrayReglas.push(
          this.fb.control(element)
        );
      });
    }
  }

  onSubmit() {
    if (this.formConfiguraciones.valid) {
      this.loading = true;
      this.updateNegocio();
    } else {
      this.validateAllFormFields(this.formConfiguraciones);
    }
  }

  updateNegocio() {
    this.afs.doc('negocios/' + this.data.id).update(this.formConfiguraciones.value)
    .then(() => {
      this.bottomSheetRef.dismiss();
      console.log('Configuraciones agregadas');
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

  agregarRegla() {
    (this.formConfiguraciones.controls.reglas as FormArray).push(
      this.fb.control('')
      // this.fb.group({
      //   variante: [''],
      //   precio: [''],
      // })
    );
  }

  eliminarRegla(index: number): void {
    (this.formConfiguraciones.controls.reglas as FormArray).removeAt(index);
  }

  cancelar() {
    this.bottomSheetRef.dismiss();
  }

}
