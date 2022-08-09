import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import * as firebase from 'firebase/app';
import { DataService } from 'src/app/services/data.service';
import { IdValidatorService } from 'src/app/services/id-validator.service';

@Component({
  selector: 'app-configurar-negocio',
  templateUrl: './configurar-negocio.component.html',
  styleUrls: ['./configurar-negocio.component.scss']
})
export class ConfigurarNegocioComponent implements OnInit {

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
      nombre: ['', Validators.required],
      id: ['', [Validators.required], [this.idValidator]],
      pais: ['', Validators.required],
      prefijo: ['', Validators.required],
      numeroWhatsApp: ['', Validators.required],
      autorId: [user.uid],
      fechaCreacion: [firebase.default.firestore.Timestamp.fromDate(new Date())]
    });

    this.formNegocio.get('nombre').valueChanges.subscribe( res => {
      const negocioIdSpace = res.replace(/ /g, '-');
      this.negocioId = negocioIdSpace.toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '');
      this.formNegocio.get('id').setValue(this.negocioId);
    });

    this.formNegocio.get('id').valueChanges.subscribe( res => {
      const negocioIdSpace = res.replace(/ /g, '-');
      this.negocioId = negocioIdSpace.toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '');
      this.formNegocio.get('id').patchValue(this.negocioId, {emitEvent: false});
    });

    this.formNegocio.get('pais').valueChanges.subscribe( res => {
      const paisSelect = this.paises.find( find => find.nombre === res);
      this.formNegocio.get('prefijo').setValue(paisSelect.prefijo);
    })

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
    this.afs.doc('negocios/' + this.negocioId).set(this.formNegocio.value)
    .then(() => {
      console.log('Negocio creado');
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
