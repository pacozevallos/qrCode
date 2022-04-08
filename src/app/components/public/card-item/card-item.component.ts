import { Component, OnInit, Input } from '@angular/core';
import { Item } from 'src/app/classes/item';
import { DetalleItemComponent } from '../detalle-item/detalle-item.component';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { AngularFirestore } from '@angular/fire/firestore';
import { Negocio } from 'src/app/classes/negocio';

@Component({
  selector: 'app-card-item',
  templateUrl: './card-item.component.html',
  styleUrls: ['./card-item.component.scss']
})
export class CardItemComponent implements OnInit {

  @Input() idNegocio: string;
  @Input() item: Item;
  precioMin: number;
  negocio: Negocio

  constructor(
    private bottomSheet: MatBottomSheet,
    private afs: AngularFirestore
  ) { }

  ngOnInit(): void {
    if (this.item.precios) {
      const precios = this.item.precios.map( res => res.precio);
      this.precioMin = Math.min(...precios);
    } else {
      console.log('No hay precios múltiples');
    };
    this.getReglasNegocio()
  }

  openBottomSheetDetalle(item) {
    this.bottomSheet.open(DetalleItemComponent, {
      panelClass: 'bottomSheetDetalleItem',
      backdropClass: 'backDropBottomSheet',
      data: {
        idNegocio: this.idNegocio, item
      }
    });
  }

  getReglasNegocio() {
    this.afs.collection('negocios').doc(this.idNegocio)?.valueChanges().subscribe( (res: Negocio) => {
      this.negocio = res;
    });
  }

}
