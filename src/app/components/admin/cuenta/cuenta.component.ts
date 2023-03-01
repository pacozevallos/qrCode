import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.component.html',
  styleUrls: ['./cuenta.component.scss']
})
export class CuentaComponent implements OnInit {

  user;

  
  constructor(
    private afAuth: AngularFireAuth
  ) { }

  ngOnInit(): void {
    this.user = this.afAuth.authState.subscribe( res => {
      this.user = res;
    });
  }

}
