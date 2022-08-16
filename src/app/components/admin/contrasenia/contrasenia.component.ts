import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-contrasenia',
  templateUrl: './contrasenia.component.html',
  styleUrls: ['./contrasenia.component.scss']
})
export class ContraseniaComponent implements OnInit {

  user;
  loading: boolean;
  aviso = false;

  constructor(
    private afAuth: AngularFireAuth,
    private auth: AuthService
  ) { }

  ngOnInit(): void {
    this.afAuth.authState.subscribe( user => {
      this.user = user;
    });
  }

  cambiarContrasenia(email) {
    this.loading = true;
    this.auth.resetPasword(email)
    .then( () => {
      this.loading = false;
      this.aviso = true;
    });
  }

}
