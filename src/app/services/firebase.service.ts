import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Item } from '../classes/item';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(
    private afs: AngularFirestore
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

  // getNegocio(idNegocio: string) {
  //   return this.afs.doc('negocios/' + idNegocio).valueChanges();
  // }

  getAllItemsDocument(idNegocio: string) {
    return this.afs.doc('negocios/' + idNegocio).collection('items', ref => ref
    // .orderBy('categoria', 'asc')
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
    // .orderBy('categoria', 'asc')
    ).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Item;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
  );
  }


}
