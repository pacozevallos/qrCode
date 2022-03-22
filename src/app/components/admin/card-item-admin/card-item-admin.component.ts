import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { Item } from 'src/app/classes/item';
import { EditarItemComponent } from '../editar-item/editar-item.component';
import { EliminarItemComponent } from '../eliminar-item/eliminar-item.component';

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
    private bottomSheet: MatBottomSheet,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
  }

  // actualizarPublicado(idItem, publicado) {
  //   this.afs.collection('negocios').doc(this.idNegocio).collection('items').doc(idItem).update({publicado});
  // }

  actualizarPublicado(idItem, change: MatSlideToggleChange) {
    // this.fs.updatePublicado(key, e);
    this.afs.collection('negocios').doc(this.idNegocio).collection('items').doc(idItem).update({
      publicado: change.checked
    });
  }

  // actualizarDestacado(itemId, $event) {
  //   this.afs.collection('negocios').doc(this.idNegocio).collection('items').doc(itemId).update({
  //     destacado: $event
  //   });
  // }

  trackByPublicado(item) {
    return item.publicado;
  }

  openModalEdit(item) {
    this.bottomSheet.open(EditarItemComponent, {
      panelClass: 'myBottomSheetFull',
      data: {
        idNegocio: this.idNegocio,
        item
      }
    });
  }

  openModalDelete(item) {
    const dialogRef = this.dialog.open(EliminarItemComponent, {
      panelClass: 'dialogSmall',
      data: {idNegocio_: this.idNegocio, item_: item}
    });
    dialogRef.afterClosed().subscribe();
  }

}
