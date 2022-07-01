import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import { map } from 'rxjs/operators';
import { Item } from '../classes/item';
import { Negocio } from 'src/app/classes/negocio';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(
    private afs: AngularFirestore,
    private afAuth: AngularFireAuth
  ) { }

  getAllNegocios() {
    return this.afs.collection('negocios', ref => ref
    // .orderBy('edad', 'asc')
    ).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as any;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
  );
  }

  getNegociosPropios() {
    const user = firebase.default.auth().currentUser;
    return this.afs.collection('negocios', (ref) => ref
      .where('autorId', '==', user.uid)
      // .orderBy('dataMetadata.fechaCreacion', 'desc')
      ).snapshotChanges().pipe(
        map((actions) =>
          actions.map((a) => {
            const data = a.payload.doc.data() as Negocio;
            const id = a.payload.doc.id;
            return { id, ...data };
          })
        )
      );
  }

  // getNegocio(idNegocio: string) {
  //   return this.afs.doc('negocios/' + idNegocio).valueChanges();
  // }

  getAllItemsDocument(idNegocio: string) {
    return this.afs.doc('negocios/' + idNegocio).collection('items', ref => ref
    .orderBy('categoria', 'asc')
    ).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Item;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
  );
  }

  getItemsDestacados(idNegocio: string) {
    return this.afs.doc('negocios/' + idNegocio).collection('items', ref => ref
    .where('publicado', '==', true )
    .where('destacado', '==', true )
    ).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Item;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  getItemsDocument(idNegocio: string) {
    return this.afs.doc('negocios/' + idNegocio).collection('items', ref => ref
    .where('publicado', '==', true )
    // .orderBy('categoria')
    .orderBy('fechaCreacion')
    ).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Item;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
  );
  }

  getUserCurrent() {
    this.afAuth.authState.subscribe( user => {
      return user;
    });
  }


}
