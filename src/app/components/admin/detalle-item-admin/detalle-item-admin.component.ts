import { Component, Inject, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { Item } from 'src/app/classes/item';

@Component({
  selector: 'app-detalle-item-admin',
  templateUrl: './detalle-item-admin.component.html',
  styleUrls: ['./detalle-item-admin.component.scss']
})
export class DetalleItemAdminComponent implements OnInit {

  item;
  opciones = [
    {
      nombre: 'Editar',
      icon: 'pencil',
      // function: () => this.editarItem()
    },
    {
      nombre: 'Compartir',
      icon: 'share',
      // function: () => this.compartirItem()
    },
    {
      nombre: 'Eliminar',
      icon: 'trash',
      // function: () => this.eliminarItem()
    }
  ];

  constructor(
    private matBottomSheetRef: MatBottomSheetRef<DetalleItemAdminComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    private afs: AngularFirestore,
  ) { }

  ngOnInit(): void {
    this.afs.collection('negocios').doc(this.data.idNegocio).collection('items').doc(this.data.item.id).valueChanges().subscribe( data => {
      this.item = data;
      console.log(data);
    });
  }

}
