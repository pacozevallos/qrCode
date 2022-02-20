import { Component, OnInit, Input } from '@angular/core';
import { Item } from 'src/app/classes/item';
import { DetalleItemComponent } from '../detalle-item/detalle-item.component';
import { MatBottomSheet } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-card-item',
  templateUrl: './card-item.component.html',
  styleUrls: ['./card-item.component.scss']
})
export class CardItemComponent implements OnInit {

  @Input() idNegocio: string;
  @Input() item: Item;

  constructor(
    private bottomSheet: MatBottomSheet
  ) { }

  ngOnInit(): void {
  }

  openBottomSheetDetalle(item) {
    this.bottomSheet.open(DetalleItemComponent, {
      data: {
        idNegocio: this.idNegocio,
        item
      }
    });
  }

}
