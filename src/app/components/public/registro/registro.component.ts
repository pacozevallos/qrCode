import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {

  formRegistro: FormGroup;
  hide = true;

  constructor(
    private auth: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.formRegistro = this.fb.group ({
      email: [ '', [Validators.required, Validators.email] ],
      password: [ '', Validators.required ],
    });
  }

  googleLogin() {
    this.auth.googleLogin();
  }

  emailSignUp() {
    this.auth.emailSignUp(this.formRegistro.value.email, this.formRegistro.value.password)
    .then( data  => {
      // this.auth.actualizarNombre(this.formRegistro.value.nombre)
      // .then( echo => {
      //   this.router.navigate(['/publicarAviso']);
      // });
    });
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
