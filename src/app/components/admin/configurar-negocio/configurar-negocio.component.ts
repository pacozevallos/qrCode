import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Timestamp } from '@angular/fire/firestore';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import * as firebase from 'firebase/compat/app';
import { DataService } from 'src/app/services/data.service';
import { IdValidatorService } from 'src/app/services/id-validator.service';
import { Negocio } from '../../../classes/negocio';

@Component({
  selector: 'app-configurar-negocio',
  templateUrl: './configurar-negocio.component.html',
  styleUrls: ['./configurar-negocio.component.scss']
})
export class ConfigurarNegocioComponent implements OnInit {

  @Input() negocio: Negocio;

  formNegocio: UntypedFormGroup;
  loading: boolean;
  negocioId: string;
  hrefCurrent = window.location.origin;
  paises = [];

  constructor(
    private fb: UntypedFormBuilder,
    private idValidator: IdValidatorService,
    private afs: AngularFirestore,
    private ds: DataService
  ) { }

  ngOnInit(): void {

    const user = firebase.default.auth().currentUser;
    this.paises = this.ds.paises;

    this.formNegocio = this.fb.group({
      nombreNegocio: [this.negocio.nombreNegocio, Validators.required],
      id: [{value: this.negocio.id, disabled: true}],
      pais: [this.negocio.pais, Validators.required],
      moneda: [this.negocio.moneda, Validators.required],
      prefijo: [this.negocio.prefijo, Validators.required],
      numeroWhatsApp: [this.negocio.numeroWhatsApp, [Validators.required, Validators.pattern('[0-9]*'), Validators.minLength(9), Validators.maxLength(9)]],
      autorId: [user.uid],
      fechaModificacion: [Timestamp.now()]
    });

    this.formNegocio.get('pais').valueChanges.subscribe( res => {
      const paisSelect = this.paises.find( find => find.nombre === res);
      this.formNegocio.get('prefijo').setValue(paisSelect.prefijo);
      this.formNegocio.get('moneda').setValue(paisSelect.moneda);
    });

    // this.formNegocio.valueChanges.subscribe(value => {
    //   console.log(value);
    // });

  }

  onSubmit() {
    if (this.formNegocio.valid) {
      this.loading = true;
      this.guardarCambios();
    } else {
      this.validateAllFormFields(this.formNegocio);
    }
  }

  guardarCambios() {
    this.afs.doc('negocios/' + this.negocio.id).update(this.formNegocio.value)
    .then(() => {
      console.log('Negocio actualizado');
      this.loading = false;
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

  errorNombreNegocio() {
    return this.formNegocio.controls.nombreNegocio.hasError('required') ? 'Ingresa un nombre para tu tienda' : '';
  }

  errorId() {
    return this.formNegocio.controls.id.hasError('required') ? 'Ingresa una url' :
    this.formNegocio.controls.id.invalid ? 'Esta url ya está tomada ' : '';
  }

  errorPais() {
    return this.formNegocio.controls.pais.hasError('required') ? 'Seleccione un país' : '';
  }

  errorWhatsApp() {
    return this.formNegocio.controls.numeroWhatsApp.hasError('required') ? 'Ingresa un número' :
    this.formNegocio.controls.numeroWhatsApp.hasError('pattern') ? 'Solo se admiten números.' :
    this.formNegocio.controls.numeroWhatsApp.hasError('minlength') ? 'Mínimo 9 caracteres' :
    this.formNegocio.controls.numeroWhatsApp.hasError('maxlength') ? 'No debe exceder 9 caracteres' : '';
  }



}
