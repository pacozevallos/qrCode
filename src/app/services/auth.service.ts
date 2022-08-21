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

  emailSignUp(dataFormRegistro) {
    return this.auth.createUserWithEmailAndPassword(dataFormRegistro.email, dataFormRegistro.password)
      .then( credential => {
        credential.user.updateProfile({
          displayName: dataFormRegistro.nombre
        });
        this.saveUser(dataFormRegistro.nombre, credential.user);
        this.saveNegocio(dataFormRegistro, credential.user);
        this.router.navigate([`/admin/productos`]);
      })
      .catch( error => {
        this.handleError(error);
      });
  }

  saveUser(nombre, user) {
    return this.afs.collection('users').doc(user.uid).set({
      displayName: nombre,
      uid: user.uid,
      email: user.email,
      plan: 'Plan Free',
      fechaCreacion: firebase.default.firestore.FieldValue.serverTimestamp(),
    });
  }

  saveNegocio(dataFormRegistro, user) {
    this.afs.doc('negocios/' + dataFormRegistro.id).set({...dataFormRegistro, autorId: user.uid})
    .then(() => {
      console.log('Megocio creado');
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
        this.router.navigate(['/admin/productos']);
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
      this.snackBar.open(`Instrucciones enviadas a: ${email}`, 'CERRAR', {
        duration: 9000,
      });
      // this.router.navigate(['/graciasContrasenia'])
    })
    .catch((error) => {
      this.handleError(error);
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


  handleError(error) {
    console.error(error);
    this.snackBar.open(error.message, 'CERRAR', {
      duration: 9000,
    });
  }

}
