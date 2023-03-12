import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import * as firebase from 'firebase/compat/app';
import { map } from 'rxjs/operators';
import { Item } from '../classes/item';
import { Negocio } from 'src/app/classes/negocio';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { User } from '../classes/user';
import { FileItem } from '../classes/file-item';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  user;
  negocio;

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

    
    // this.afs.collection(`negocios/${this.idNegocio}/items/${itemId}/images`).get().subscribe( (res: any) => {
    //   const image = res.find( (find: any) => find.order === 1 );
    //   const imageUrl = image?.urlImage;
    // });

    return this.afs.collection('negocios').doc(idNegocio).collection('items', ref => ref
    // .orderBy('categoria', 'asc')
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

  getUsersFirestore() {
    return this.afs.collection('users').valueChanges();
  }

  getUserCurrent() {
    this.afAuth.authState.subscribe( user => {
      return user;
    });
  }

  addSuscripcion() {
    this.afs.collection('suscripciones').add({

    });
  }

  getUsers() {
    return this.afs.collection('users', ref => ref
    ).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as User;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  getNegocioUser() {

    // this.afAuth.authState.subscribe( user => {
    //   return this.user = user;
    // });

    const user = firebase.default.auth().currentUser;

    return this.afs.collection('negocios').valueChanges().subscribe( res => {
      const negocioRef = res.find( (find: Negocio) => find.autorId === user.uid );
      return negocioRef;
    });

  }

  getAllImagesItem(negocioId: string, itemId: string) {

    return this.afs.collection('negocios').doc(negocioId).collection('items').doc(itemId).collection('images', ref => ref
    .orderBy('order', 'asc')
    ).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as FileItem;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );



  }


}
