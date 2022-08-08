import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Item } from 'src/app/classes/item';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-items-negocio',
  templateUrl: './items-negocio.component.html',
  styleUrls: ['./items-negocio.component.scss']
})
export class ItemsNegocioComponent implements OnInit {

  id: string;
  items: Item[] = [];
  itemsGroup = [];

  constructor(
    private fs: FirebaseService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe( params => {
      this.id = params.id;

      this.fs.getItemsDocument(this.id).subscribe( res => {
        this.items = res;
        this.itemsGroup = this.items.reduce((prev, { categoria, ...items }) => {
          const id = prev.findIndex((item) => item.categoria === categoria);
          id >= 0
            ? prev[id].items.push(items)
            : prev.push({categoria, items: [items]});
          return prev;
        }, []);
        // console.log(this.itemsGroup);
      });

    });

  }

}
