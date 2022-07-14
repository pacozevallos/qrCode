import { Component, Inject, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-agregar-celular',
  templateUrl: './agregar-celular.component.html',
  styleUrls: ['./agregar-celular.component.scss']
})
export class AgregarCelularComponent implements OnInit {

  formWhatsApp: FormGroup;
  loading: boolean;

  constructor(
    private bottomSheetRef: MatBottomSheetRef<AgregarCelularComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    private fb: FormBuilder,
    private afs: AngularFirestore,
  ) { }

  ngOnInit(): void {
    this.formWhatsApp = this.fb.group({
      numeroWhatsApp: [this.data.numeroWhatsApp, [Validators.required, Validators.pattern('[0-9]*'), Validators.minLength(9), Validators.maxLength(9)]],
    });
  }

  onSubmit() {
    if (this.formWhatsApp.valid) {
      this.loading = true;
      this.updateNegocio();
    } else {
      this.validateAllFormFields(this.formWhatsApp);
    }
  }

  updateNegocio() {
    this.afs.doc('negocios/' + this.data.id).update({
      numeroWhatsApp: this.formWhatsApp.value.numeroWhatsApp})
    .then(() => {
      this.bottomSheetRef.dismiss();
      console.log('WhatsApp agregado');
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

  cancelar() {
    this.bottomSheetRef.dismiss();
  }

  errorWhatsApp() {
    return this.formWhatsApp.controls.numeroWhatsApp.hasError('required') ? 'Ingresa un número' :
    this.formWhatsApp.controls.numeroWhatsApp.hasError('pattern') ? 'Solo se admiten números.' :
    this.formWhatsApp.controls.numeroWhatsApp.hasError('minlength') ? 'Mínimo 9 caracteres' :
    this.formWhatsApp.controls.numeroWhatsApp.hasError('maxlength') ? 'No debe exceder 9 caracteres' : '';
  }

}
