import { Component, Input, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { Item } from 'src/app/classes/item';
import { DetalleItemComponent } from '../detalle-item/detalle-item.component';

@Component({
  selector: 'app-card-item-destacado',
  templateUrl: './card-item-destacado.component.html',
  styleUrls: ['./card-item-destacado.component.scss']
})
export class CardItemDestacadoComponent implements OnInit {

  @Input() idNegocio: string;
  @Input() item: Item;

  constructor(
    private bottomSheet: MatBottomSheet
  ) { }

  ngOnInit(): void {
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

}
