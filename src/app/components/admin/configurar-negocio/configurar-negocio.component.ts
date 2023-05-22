import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Timestamp } from '@angular/fire/firestore';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import * as firebase from 'firebase/compat/app';
import { DataService } from 'src/app/services/data.service';
import { IdValidatorService } from 'src/app/services/id-validator.service';
import { Negocio } from '../../../classes/negocio';
import { MatDialog } from '@angular/material/dialog';
import { LoadingComponent } from 'src/app/admin/loading/loading.component';

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
  disabled = true;
  newNegocio;

  constructor(
    private fb: FormBuilder,
    private idValidator: IdValidatorService,
    private afs: AngularFirestore,
    private ds: DataService,
    private matDialog: MatDialog
  ) { }

  ngOnInit(): void {

    // console.log(this.negocio);

    this.newNegocio = {
      nombreNegocio: this.negocio.nombreNegocio,
      pais: this.negocio.pais,
      moneda: this.negocio.moneda,
      prefijo: this.negocio.prefijo,
      numeroWhatsApp: this.negocio.numeroWhatsApp,
    };

    console.log(this.newNegocio);
    
    

    const user = firebase.default.auth().currentUser;
    this.paises = this.ds.paises;

    this.formNegocio = this.fb.group({
      nombreNegocio: [this.negocio.nombreNegocio, Validators.required],
      // id: [{value: this.negocio.id, disabled: true}],
      pais: [this.negocio.pais, Validators.required],
      moneda: [this.negocio.moneda, Validators.required],
      prefijo: [this.negocio.prefijo, Validators.required],
      numeroWhatsApp: [this.negocio.numeroWhatsApp, [Validators.required, Validators.pattern('[0-9]*'), Validators.minLength(9), Validators.maxLength(9)]],
      // autorId: [user.uid],
      // fechaModificacion: [Timestamp.now()]
    });


    this.formNegocio.get('pais').valueChanges.subscribe( res => {
      const paisSelect = this.paises.find( find => find.nombre === res);
      this.formNegocio.get('prefijo').setValue(paisSelect.prefijo);
      this.formNegocio.get('moneda').setValue(paisSelect.moneda);
    });


    this.formNegocio.valueChanges.subscribe( value => {
      JSON.stringify(this.newNegocio) === JSON.stringify(value) ? this.disabled = true : this.disabled = false;
    });

  }

  onSubmit() {
    if (this.formNegocio.valid) {
      this.guardarCambios();
    } else {
      this.validateAllFormFields(this.formNegocio);
    }
  }

  guardarCambios() {
    this.loading = true;
    this.afs.doc('negocios/' + this.negocio.id).update(this.formNegocio.value)
    .then(() => {
      console.log('Negocio actualizado');
      this.loading = false;
      this.disabled = true;
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

  openModalLoading() {
    this.matDialog.open(LoadingComponent)
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
