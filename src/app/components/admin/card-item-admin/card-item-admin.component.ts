import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Item } from 'src/app/classes/item';

@Component({
  selector: 'app-card-item-admin',
  templateUrl: './card-item-admin.component.html',
  styleUrls: ['./card-item-admin.component.scss']
})
export class CardItemAdminComponent implements OnInit {

  @Input() idNegocio: string;
  @Input() item: Item;

  constructor(
    private afs: AngularFirestore,
  ) { }

  ngOnInit(): void {
  }

  actualizarPublicado(idItem, publicado) {
    // this.fs.updatePublicado(key, e);
    this.afs.collection('negocios').doc(this.idNegocio).collection('items').doc(idItem).update({publicado});
  }

  // actualizarDestacado(itemId, $event) {
  //   this.afs.collection('negocios').doc(this.idNegocio).collection('items').doc(itemId).update({
  //     destacado: $event
  //   });
  // }

  trackByPublicado(item) {
    return item.publicado;
  }

}
