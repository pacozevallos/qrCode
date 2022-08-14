import { Component, Inject, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatBottomSheet, MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ShareComponent } from '../../public/share/share.component';
import { Item } from 'src/app/classes/item';
import { Negocio } from 'src/app/classes/negocio';
import { EditarItemComponent } from '../editar-item/editar-item.component';
import { EliminarItemComponent } from '../eliminar-item/eliminar-item.component';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-detalle-item-admin',
  templateUrl: './detalle-item-admin.component.html',
  styleUrls: ['./detalle-item-admin.component.scss']
})
export class DetalleItemAdminComponent implements OnInit {

  idNegocio: string;
  negocio: Negocio;
  idItem: string;
  item;
  urlBack: string;
  opciones = [
    {
      nombre: 'Editar',
      icon: 'pencil',
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

  acciones = [];

  constructor(
    private afs: AngularFirestore,
    private activatedRoute: ActivatedRoute,
    private matDialog: MatDialog,
    private bottomSheet: MatBottomSheet,
  ) { }

  ngOnInit(): void {

    this.idNegocio = this.activatedRoute.snapshot.url[0].path;

    this.afs.collection('negocios').doc(this.idNegocio).valueChanges().subscribe( (data: Negocio) => {
      this.negocio = data;
    });

    this.activatedRoute.params.subscribe( params => {
      this.idItem = params.id;

      this.afs.collection('negocios').doc(this.idNegocio).collection('items').doc(this.idItem).valueChanges().subscribe( data => {
        this.item = data;

        this.acciones = [
          {
            nombre: 'Visible',
            descripcion: 'Muestra u oculta este producto',
            checked: this.item.publicado,
            function: (idItem, change: MatSlideToggleChange) => this.actualizarPublicado(idItem, change)
          },
          {
            nombre: 'Destacado',
            descripcion: 'Muestra este producto en la zona de Destacados',
            checked: this.item.destacado,
            function: (idItem, change: MatSlideToggleChange) => this.actualizarDestacado(idItem, change)
          },
        ];

      });

    });

    this.urlBack = `/admin/${this.idNegocio}/productos`;

  }

  editarItem() {
    this.bottomSheet.open(EditarItemComponent, {
      data: {
        idNegocio: this.idNegocio,
        item: this.item
      }
    });
  }

  compartirItem() {
    this.matDialog.open(ShareComponent, {
      data: {
        negocio: this.negocio,
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

  actualizarPublicado(idItem, change: MatSlideToggleChange) {
    this.afs.collection('negocios').doc(this.idNegocio).collection('items').doc(idItem).update({
      publicado: change.checked
    });
  }

  actualizarDestacado(idItem, change: MatSlideToggleChange) {
    this.afs.collection('negocios').doc(this.idNegocio).collection('items').doc(idItem).update({
      destacado: change.checked
    });
  }

}
