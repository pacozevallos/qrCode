import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { Item } from 'src/app/classes/item';
import { ShareComponent } from '../../public/share/share.component';
import { EditarItemComponent } from '../editar-item/editar-item.component';
import { EliminarItemComponent } from '../eliminar-item/eliminar-item.component';
import { DetalleItemAdminComponent } from '../detalle-item-admin/detalle-item-admin.component';

@Component({
  selector: 'app-card-item-admin',
  templateUrl: './card-item-admin.component.html',
  styleUrls: ['./card-item-admin.component.scss']
})
export class CardItemAdminComponent implements OnInit {

  @Input() idNegocio: string;
  @Input() item: Item;
  precioMin: number;

  opciones = [
    {
      nombre: 'Editar',
      icon: 'pencil',
      function: () => this.editarItem()
    },
    {
      nombre: 'Destacar',
      icon: 'star',
      function: () => this.editarItem()
    },
    {
      nombre: 'Compartir',
      icon: 'share',
      function: () => this.compartirItem()
    },
    {
      nombre: 'Eliminar',
      icon: 'trash',
      function: () => this.eliminarItem()
    }
  ];

  constructor(
    private afs: AngularFirestore,
    private bottomSheet: MatBottomSheet,
    private matDialog: MatDialog,
  ) { }

  ngOnInit(): void {
    if (this.item.precios) {
      const precios = this.item.precios.map( res => res.precio);
      this.precioMin = Math.min(...precios);
    } else {
      console.log('No hay precios múltiples');
    }
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

  detalleItem() {
    this.bottomSheet.open(DetalleItemAdminComponent, {
      data: {
        idNegocio: this.idNegocio,
        item: this.item
      }
    });
  }

  editarItem() {
    this.bottomSheet.open(EditarItemComponent, {
      // panelClass: 'myBottomSheetFull',
      data: {
        idNegocio: this.idNegocio,
        item: this.item
      }
    });
  }

  eliminarItem() {
    const dialogRef = this.matDialog.open(EliminarItemComponent, {
      panelClass: 'dialogSmall',
      data: {
        idNegocio: this.idNegocio,
        item: this.item
      }
    });
    dialogRef.afterClosed().subscribe();
  }

  compartirItem() {
    this.matDialog.open(ShareComponent, {
      panelClass: 'modalSmall'
    });
  }

}
