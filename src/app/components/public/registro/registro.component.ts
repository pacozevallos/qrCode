import { Component, OnInit } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar as MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { ModalPoliticaComponent } from 'src/app/init/modal-politica/modal-politica.component';
import { ModalTerminosComponent } from 'src/app/init/modal-terminos/modal-terminos.component';
import { TerminosCondicionesComponent } from 'src/app/init/terminos-condiciones/terminos-condiciones.component';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';
import { EmailValidatorService } from 'src/app/services/email-validator.service';
import { IdValidatorService } from 'src/app/services/id-validator.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {

  formRegistro: FormGroup;
  hide = true;
  caracteristicas = [];
  loading: boolean;
  hrefCurrent = window.location.origin;
  paises = [];
  negocioId: string;

  constructor(
    private auth: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private ds: DataService,
    private idValidator: IdValidatorService,
    private matDialog: MatDialog,
    private emailValidator: EmailValidatorService,
  ) { }

  ngOnInit(): void {

    this.paises = this.ds.paises.sort( (a: any, b: any) => (a.nombre > b.nombre) ? 1 : -1 );    

    this.formRegistro = this.fb.group ({
      // nombre: ['', Validators.required],
      email: [ '', [Validators.required, Validators.email], [this.emailValidator] ],
      password: [ '', [Validators.required, Validators.minLength(6)]],
      nombreNegocio: ['', [Validators.required]],
      id: ['', [Validators.required], [this.idValidator]],
      pais: ['', Validators.required],
      moneda: ['', Validators.required],
      prefijo: ['', Validators.required],
      // numeroWhatsApp: ['', [Validators.required, Validators.pattern('[0-9]*'), Validators.minLength(9), Validators.maxLength(9)]],
      imageLogo: [''],
      color: ['#1456D8', Validators.required],
      fechaCreacion: [Timestamp.now()],
      aceptaTerminosCondiciones: [false, Validators.requiredTrue],
    });

    this.formRegistro.get('nombreNegocio').valueChanges.subscribe( res => {
      const negocioIdSpace = res.replace(/ /g, '-');
      this.negocioId = negocioIdSpace.toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '');
      this.formRegistro.get('id').setValue(this.negocioId);

      if (this.formRegistro.controls.id.invalid) {
        const negocioIdNew = `${this.negocioId}2`;
        this.formRegistro.get('id').setValue(negocioIdNew);
      }
      
    });

    this.formRegistro.get('id').valueChanges.subscribe( res => {
      const negocioIdSpace = res.replace(/ /g, '-');
      this.negocioId = negocioIdSpace.toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '');
      this.formRegistro.get('id').patchValue(this.negocioId, {emitEvent: false});
    });

    this.formRegistro.get('pais').valueChanges.subscribe( res => {
      const paisSelect = this.paises.find( find => find.nombre === res);
      this.formRegistro.get('prefijo').setValue(paisSelect.prefijo);
      this.formRegistro.get('moneda').setValue(paisSelect.moneda);
    });

    this.caracteristicas = this.ds.caracteristicas;
  }

  onSubmit() {
    if (this.formRegistro.valid) {
      this.loading = true;
      this.emailSignUp();
    } else {
      this.validateAllFormFields(this.formRegistro);
    }
  }

  emailSignUp() {
    this.auth.emailSignUp(this.formRegistro.value)
    .then( data  => {
      // this.auth.actualizarNombre(this.formRegistro.value.nombre)
      // .then( echo => {
      //   this.router.navigate(['/publicarAviso']);
      // });
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


  openModalTerminos() {
    this.matDialog.open(ModalTerminosComponent, {
      autoFocus: false,
      panelClass: 'dialogLarge'
    });
  }

  openModalPolitica() {
    this.matDialog.open(ModalPoliticaComponent, {
      autoFocus: false,
      panelClass: 'dialogLarge'
    });
  }

  errorNombre() {
    return this.formRegistro.controls.nombre.hasError('required') ? 'El nombre es necesario.' : '';
  }

  errorEmail() {
    return this.formRegistro.controls.email.hasError('required') ? 'El email es necesario.' :
    this.formRegistro.controls.email.hasError('email') ? 'No es un correo válido' : 
    this.formRegistro.controls.email.invalid ? 'Este email ya esá en uso' : '';
    '';
  }
  errorPassword() {
    return this.formRegistro.controls.password.hasError('required') ? 'La contraseña es necesaria.' :
    this.formRegistro.controls.password.hasError('minlength') ? 'Mínimo 6 caracteres' : '';
  }

  errorNombreNegocio() {
    return this.formRegistro.controls.nombreNegocio.hasError('required') ? 'Ingresa un nombre' : '';
  }

  errorId() {
    return this.formRegistro.controls.id.hasError('required') ? 'Ingresa una url' :
    this.formRegistro.controls.id.invalid ? 'Esta url ya está tomada' : '';
  }


  changeIdNegocio() {
    this.formRegistro.controls.id.invalid ? this.negocioId = 'xxx' : 'zzz'
  }

  errorPais() {
    return this.formRegistro.controls.pais.hasError('required') ? 'Seleccione un país' : '';
  }

  errorWhatsApp() {
    return this.formRegistro.controls.numeroWhatsApp.hasError('required') ? 'Ingresa un número' :
    this.formRegistro.controls.numeroWhatsApp.hasError('pattern') ? 'Solo se admiten números.' :
    this.formRegistro.controls.numeroWhatsApp.hasError('minlength') ? 'Mínimo 9 caracteres' :
    this.formRegistro.controls.numeroWhatsApp.hasError('maxlength') ? 'No debe exceder 9 caracteres' : '';
  }

  errorImagen() {
    return this.formRegistro.controls.image.hasError('required') ? 'La imagen es necesaria' :
    this.formRegistro.controls.image.hasError('maxContentSize') ? 'El peso no debe exceder los 5 MB' : '';
  }

  errorAceptaTerminosCondiciones() {
    return this.formRegistro.controls.aceptaTerminosCondiciones.hasError('required') &&
    this.formRegistro.controls.aceptaTerminosCondiciones.touched ? 'Es necesario aceptar los términos' : '';
  }



}
