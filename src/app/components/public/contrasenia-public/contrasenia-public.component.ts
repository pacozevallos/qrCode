import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-contrasenia-public',
  templateUrl: './contrasenia-public.component.html',
  styleUrls: ['./contrasenia-public.component.scss']
})
export class ContraseniaPublicComponent implements OnInit {

  user;
  loading: boolean;
  aviso = false;
  email: FormControl;

  constructor(
    public auth : AuthService
  ) { }

  ngOnInit(): void {
    this.email = new FormControl ('', Validators.required)
  }

  cambiarContrasenia() {
    this.loading = true;
    this.auth.resetPasword(this.email.value)
    .then( () => {
      this.loading = false;
    });
  }

}
