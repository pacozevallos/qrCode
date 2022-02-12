import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user;
  displayName: string;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    public router: Router,
    public snackBar: MatSnackBar,
    public readonly ngZone: NgZone,
  ) { }

  emailLogin(email: string, password: string ) {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then(credential => {
        // this.notify.update('Welcome to Firestarter!!!', 'success');
        // return this.updateUserData(credential.user)
        // this.pushUserDataEmail(credential.user)
        console.log('Usuario logueado');
        this.router.navigate(['/admin']);
      })
      .catch(error => {
        this.handleError(error);
      });
  }

  signOut() {
    this.afAuth.signOut().then(() => {
        this.router.navigate(['/login']);
    });
  }

  // Si hay un error, registro de consola y notificación con Mat SnackBar a Usuario
  private handleError(error) {
    console.error(error);

    // Utilizar ngZone para los SnackBar
    this.ngZone.run(() => {
      this.snackBar.open(error.message, 'CERRAR', {
        duration: 5000,
      });
    });
  }
}
