import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { MatSnackBar as MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import * as firebase from 'firebase/compat/app';
import { Timestamp } from 'firebase/firestore';
import { Negocio } from '../classes/negocio';
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
        // credential.user.updateProfile({
        //   displayName: dataFormRegistro.nombre
        // });
        this.saveUser(dataFormRegistro, credential.user);
        this.saveNegocio(dataFormRegistro, credential.user);
        this.router.navigate([`/admin/productos`]);
      })
      .catch( error => {
        this.handleError(error);
      });
  }

  saveUser(dataFormRegistro, user) {
    return this.afs.collection('users').doc(user.uid).set({
      // displayName: dataFormRegistro.nombre,
      uid: user.uid,
      email: user.email,
      plan: 'Plan Free',
      negocioId: dataFormRegistro.id,
      fechaCreacion: Timestamp.now(),
    });
  }

  saveNegocio(dataFormRegistro, user) {
    const dataNoPassword  = dataFormRegistro;
    ['password', 'email'].forEach(e => delete dataNoPassword[e]);
    this.afs.doc('negocios/' + dataFormRegistro.id).set({...dataNoPassword, autorId: user.uid})
    .then(() => {
      console.log('Megocio creado');
    });
  }

  emailLogin(email: string, password: string ) {
    return this.auth.signInWithEmailAndPassword(email, password)
      .then(credential => {

        // this.notify.update('Welcome to Firestarter!!!', 'success');
        // return this.updateUserData(credential.user)
        // this.pushUserDataEmail(credential.user)


        // this.auth.authState.subscribe( user => {
        //   this.user = user;
        //   this.afs.collection('negocios').valueChanges().subscribe( (res: any) => {
        //     const negocio = res.find( (find: Negocio) => find.autorId === this.user.uid );
        //     const idNegocio = negocio.id;
        //     console.log('Usuario logueado');
        //     this.router.navigate([`/admin/${idNegocio}/productos`]);
        //   });
        // });

        console.log('Usuario logueado');
        this.router.navigate([`/admin/productos`]);

       
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
