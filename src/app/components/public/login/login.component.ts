import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { ContraseniaPublicComponent } from '../contrasenia-public/contrasenia-public.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formLogin: UntypedFormGroup;
  hide = true;
  deshabilitado: boolean;

  constructor(
    private fb: UntypedFormBuilder,
    public auth: AuthService,
    private matDialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.formLogin = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.formLogin.valid) {
      this.emailLogin();
      this.deshabilitado = true;
    } else {
      this.validateAllFormFields(this.formLogin);
      this.deshabilitado = false;
    }
  }

  emailLogin() {
    this.auth.emailLogin(this.formLogin.value.email, this.formLogin.value.password)
    .then(() => {
      // this.dialogRef.close();
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

  openModalRecuperarContrasenia() {
    this.matDialog.open(ContraseniaPublicComponent, {
      panelClass: 'dialogSmall',
      autoFocus: false
    })
  }

  errorEmail() {
    return this.formLogin.controls.email.hasError('required') ? 'Ingrese el Email' :
    this.formLogin.controls.email.hasError('email') ? 'No es un email válido.' : '';
  }

  errorPassword() {
    return this.formLogin.controls.password.hasError('required') ? 'Ingrese la contraseña' : '';
  }

}
