import { Component, Inject, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { UntypedFormArray, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { Negocio } from 'src/app/classes/negocio';

@Component({
  selector: 'app-adicionales',
  templateUrl: './adicionales.component.html',
  styleUrls: ['./adicionales.component.scss']
})
export class AdicionalesComponent implements OnInit {

  formConfiguraciones: UntypedFormGroup;
  loading: boolean;
  lista = [
    '"Delivery + S/. 5"',
    '"Servicio a la habitación + S/. 5"',
    '"Horario de atención 13:00 h - 23:00 h"',

  ];

  constructor(
    private bottomSheetRef: MatBottomSheetRef<AdicionalesComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: Negocio,
    private fb: UntypedFormBuilder,
    private afs: AngularFirestore
  ) { }

  ngOnInit(): void {
    this.formConfiguraciones = this.fb.group({
      reglas: this.fb.array([
        // this.fb.control('')
      ]),
    });

    const arrayReglas = this.formConfiguraciones.controls.reglas as UntypedFormArray;
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

  agregarRegla() {
    (this.formConfiguraciones.controls.reglas as UntypedFormArray).push(
      this.fb.control('')
      // this.fb.group({
      //   variante: [''],
      //   precio: [''],
      // })
    );
  }

  eliminarRegla(index: number): void {
    (this.formConfiguraciones.controls.reglas as UntypedFormArray).removeAt(index);
  }

  cancelar() {
    this.bottomSheetRef.dismiss();
  }

}
