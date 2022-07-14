import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { User } from '../classes/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user;
  displayName: string;

  constructor(
    public auth: AngularFireAuth,
    private afs: AngularFirestore,
    public router: Router,
    public snackBar: MatSnackBar,
    public readonly ngZone: NgZone,
  ) { }

  emailSignUp(nombre: string, email: string, password: string) {
    return this.auth.createUserWithEmailAndPassword(email, password,)
      .then( credential => {
        this.router.navigate(['/admin/elegirPlan']);
        credential.user.updateProfile({
          displayName: nombre
        });
        this.saveUserEmail(nombre, credential.user);
      })
      .catch( error => {
        this.handleError(error);
      });
  }

  saveUserEmail(nombre, user) {
    return this.afs.collection('users').add({
      displayName: nombre,
      uid: user.uid,
      email: user.email,
      plan: 'Free',
      fechaCreacion: firebase.default.firestore.FieldValue.serverTimestamp(),
    });
  }

  emailLogin(email: string, password: string ) {
    return this.auth
      .signInWithEmailAndPassword(email, password)
      .then(credential => {
        // this.notify.update('Welcome to Firestarter!!!', 'success');
        // return this.updateUserData(credential.user)
        // this.pushUserDataEmail(credential.user)
        console.log('Usuario logueado');
        this.router.navigate(['/admin']);
        // window.open('/admin', '_blank');
      })
      .catch(error => {
        this.handleError(error);
      });
  }

  googleLogin() {
    this.auth.signInWithPopup(new firebase.default.auth.GoogleAuthProvider());
  }

  resetPasword(email) {
    return this.auth.sendPasswordResetEmail(email)
    .then( () => {
      console.log('email enviado');
    })
    .catch((error) => {
      console.log(error);
    });

  }

  pushUserDataEmail(user: User) {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);
    const data: User = {
      uid: user.uid,
      email: user.email,
      displayName: this.displayName
      // displayName: user.displayName
    };
    userRef.set(data, { merge: true });
  }

  signOut() {
    this.auth.signOut().then(() => {
        this.router.navigate(['/login']);
    });
  }

  // Si hay un error, registro de consola y notificación con Mat SnackBar a Usuario
  handleError(error) {
    console.error(error);

    // Utilizar ngZone para los SnackBar
    this.ngZone.run(() => {
      this.snackBar.open(error.message, 'CERRAR', {
        duration: 5000,
      });
    });
  }

}
