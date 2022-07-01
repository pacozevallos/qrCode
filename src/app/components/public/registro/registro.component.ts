import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {

  formRegistro: FormGroup;
  hide = true;

  caracteristicas = [];

  constructor(
    private auth: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private ds: DataService
  ) { }

  ngOnInit(): void {
    this.formRegistro = this.fb.group ({
      nombre: ['', Validators.required],
      email: [ '', [Validators.required, Validators.email] ],
      password: [ '', Validators.required ],
    });

    this.caracteristicas = this.ds.caracteristicas;
  }

  googleLogin() {
    this.auth.googleLogin();
  }

  emailSignUp() {
    this.auth.emailSignUp(this.formRegistro.value.nombre, this.formRegistro.value.email, this.formRegistro.value.password)
    .then( data  => {
      // this.auth.actualizarNombre(this.formRegistro.value.nombre)
      // .then( echo => {
      //   this.router.navigate(['/publicarAviso']);
      // });
    });
  }

  errorNombre() {
    return this.formRegistro.controls.email.hasError('required') ? 'El nombre es necesario.' : '';
  }

  errorEmail() {
    return this.formRegistro.controls.email.hasError('required') ? 'El email es necesario.' :
    this.formRegistro.controls.email.hasError('email') ? 'No es un correo válido' : '';
  }
  errorPassword() {
    return this.formRegistro.controls.password.hasError('required') ? 'La contraseña es necesaria.' :
    this.formRegistro.controls.password.hasError('minlength') ? 'Mínimo 6 caracteres' : '';
  }

}
