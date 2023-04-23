import { Component, Input, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { Item } from 'src/app/classes/item';
import { DetalleItemComponent } from '../detalle-item/detalle-item.component';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Negocio } from 'src/app/classes/negocio';

@Component({
  selector: 'app-card-item-destacado',
  templateUrl: './card-item-destacado.component.html',
  styleUrls: ['./card-item-destacado.component.scss']
})
export class CardItemDestacadoComponent implements OnInit {

  // @Input() idNegocio: string;
  @Input() item: Item;
  precioMin: number;
  negocio: Negocio;
  unico: boolean;
  variable: boolean;

  constructor(
    private bottomSheet: MatBottomSheet,
    private activatedRoute: ActivatedRoute,
    private afs: AngularFirestore
  ) { }

  ngOnInit(): void {

    
    const idNegocio = this.activatedRoute.snapshot.params.id;
    
    this.afs.doc(`negocios/${idNegocio}`).valueChanges().subscribe( (res: Negocio) => {
      this.negocio = res;
    });

    this.item.tipoPrecio === 'Precio único' ? this.unico = true : this.variable = true;

    if (this.item.precios) {
      const precios = this.item.precios.map( res => res.precio);
      this.precioMin = Math.min(...precios);
    } else {
      // console.log('No hay precios múltiples');
    }

  }

  // openBottomSheetDetalle(item) {
  //   this.bottomSheet.open(DetalleItemComponent, {
  //     panelClass: 'bottomSheetDetalleItem',
  //     backdropClass: 'backDropBottomSheet',
  //     data: {
  //       idNegocio: this.idNegocio, item
  //     }
  //   });
  // }

}
