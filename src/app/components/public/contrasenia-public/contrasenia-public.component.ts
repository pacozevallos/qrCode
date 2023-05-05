import { Component, Inject, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-contrasenia-public',
  templateUrl: './contrasenia-public.component.html',
  styleUrls: ['./contrasenia-public.component.scss']
})
export class ContraseniaPublicComponent implements OnInit {


  user;
  loading: boolean;
  form = true;
  avisoSuccess = false;
  avisoError = false;
  email = new FormControl('', Validators.required);

  constructor(
    public auth : AuthService,
    private afAuth: AngularFireAuth,
    private dialogRef: MatDialogRef<ContraseniaPublicComponent>,
    // @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
    // this.email = new FormControl ('', Validators.required)
  }

  cambiarContrasenia() {
    this.loading = true;
    this.auth.resetPasword(this.email.value)
    .then( () => {
      this.loading = false;
    });
  }

  onSubmit() {
    if (this.email.valid) {
      this.resetPasword();
    } else {
      this.validateAllFormFields(this.email);
    }
  }

  resetPasword() {
    this.loading = true;
    this.afAuth.sendPasswordResetEmail(this.email.value)
    .then( () => {
      this.avisoSuccess = true;
      this.form = false;
    })
    .catch((error) => {
      console.log(error);
      this.avisoError = true;
      this.form = false;
    });
  }

  validateAllFormFields(email: FormControl) {

    // Object.keys(formGroup.controls).forEach(field => {
    //   const control = formGroup.get(field);
    //   if (control instanceof FormControl) {
    //     control.markAsTouched({ onlySelf: true });
    //   } else if (control instanceof FormGroup) {
    //     this.validateAllFormFields(control);
    //   }
    // });

    const control = email;

    if (control instanceof FormControl) {
      control.markAsTouched({ onlySelf: true });
    }


  }

  cancelar() {
    this.dialogRef.close();
  }

}
