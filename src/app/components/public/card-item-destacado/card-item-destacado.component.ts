import { Component, Input, OnInit } from '@angular/core';
import { Item } from 'src/app/classes/item';

@Component({
  selector: 'app-card-item-destacado',
  templateUrl: './card-item-destacado.component.html',
  styleUrls: ['./card-item-destacado.component.scss']
})
export class CardItemDestacadoComponent implements OnInit {

  @Input() item: Item;

  constructor() { }

  ngOnInit(): void {
  }

}
