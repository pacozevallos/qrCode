import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import * as firebase from 'firebase/app';
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

  formNegocio: FormGroup;
  loading: boolean;
  negocioId: string;
  hrefCurrent = window.location.origin;
  paises = [];

  constructor(
    private fb: FormBuilder,
    private idValidator: IdValidatorService,
    private afs: AngularFirestore,
    private ds: DataService
  ) { }

  ngOnInit(): void {
    const user = firebase.default.auth().currentUser;
    this.paises = this.ds.paises;

    this.formNegocio = this.fb.group({
      nombre: [this.negocio.nombreNegocio, Validators.required],
      id: [{value: this.negocio.id, disabled: true}],
      pais: [this.negocio.pais, Validators.required],
      moneda: [this.negocio.moneda, Validators.required],
      prefijo: [this.negocio.prefijo, Validators.required],
      numeroWhatsApp: [this.negocio.numeroWhatsApp, [Validators.required, Validators.pattern('[0-9]*'), Validators.minLength(9), Validators.maxLength(9)]],
      autorId: [user.uid],
      fechaModificacion: [firebase.default.firestore.Timestamp.fromDate(new Date())]
    });

    this.formNegocio.get('pais').valueChanges.subscribe( res => {
      const paisSelect = this.paises.find( find => find.nombre === res);
      this.formNegocio.get('prefijo').setValue(paisSelect.prefijo);
      this.formNegocio.get('moneda').setValue(paisSelect.moneda);
    });

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

  errorNombreNegocio() {
    return this.formNegocio.controls.nombre.hasError('required') ? 'Ingresa un nombre' : '';
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
