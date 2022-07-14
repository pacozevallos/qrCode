import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/classes/user';

@Component({
  selector: 'app-actualizar-datos',
  templateUrl: './actualizar-datos.component.html',
  styleUrls: ['./actualizar-datos.component.scss']
})
export class ActualizarDatosComponent implements OnInit {

  user: User;
  loading: boolean;
  formDatos: FormGroup;

  constructor(
    private afAuth: AngularFireAuth,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.afAuth.authState.subscribe( res => {
      this.user = res;

      this.formDatos = this.fb.group({
        nombre: [this.user.displayName, Validators.required],
        email: [ {value:this.user.email, disabled: true}, [Validators.required, Validators.email] ],
      });

    });

    
  }

  onSubmit() {
    if (this.formDatos.valid) {
      this.loading = true;
      this.actualizarDatos();
    } else {
      this.validateAllFormFields(this.formDatos);
    }
  }


  // getCurrentuser() {
  //   this.afAuth.authState.subscribe( res => {
  //     return this.user = res;
  //   });
  // }

  async actualizarDatos() {
    (await this.afAuth.currentUser).updateProfile({
      displayName: this.formDatos.value.nombre
    })
    .then( () => {
      console.log('Perfil actualizado');
      this.router.navigate(['/admin/cuenta'])
    })
    .catch( (error) => {
      console.log(error);
    });
    // (await this.afAuth.currentUser).updateEmail(this.formDatos.value.email)
    // .then( () => {
    //   console.log('Email actualizado');
    // });
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

  errorNombre() {
    return this.formDatos.controls.nombre.hasError('required') ? 'El nombre es necesario.' : '';
  }

  errorEmail() {
    return this.formDatos.controls.email.hasError('required') ? 'El email es necesario.' :
    this.formDatos.controls.email.hasError('email') ? 'No es un email válido' : '';
  }

}
