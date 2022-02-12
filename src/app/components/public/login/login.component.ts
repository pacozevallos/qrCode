import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formLogin: FormGroup;
  hide = true;
  deshabilitado: boolean;

  constructor(
    private fb: FormBuilder,
    public auth: AuthService,
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

  errorEmail() {
    return this.formLogin.controls.email.hasError('required') ? 'Ingrese el Email' :
    this.formLogin.controls.email.hasError('email') ? 'No es un email válido.' : '';
  }

  errorPassword() {
    return this.formLogin.controls.password.hasError('required') ? 'Ingrese la contraseña' : '';
  }

}
