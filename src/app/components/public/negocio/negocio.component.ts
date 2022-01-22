import { Component, OnInit } from '@angular/core';
import { Negocio } from 'src/app/classes/negocio';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Item } from '../../../classes/item';

@Component({
  selector: 'app-negocio',
  templateUrl: './negocio.component.html',
  styleUrls: ['./negocio.component.scss']
})
export class NegocioComponent implements OnInit {

  id: string;
  negocio: Negocio;
  categorias = [];
  items: Item[] = [];
  itemsGroup = [];

  itemsPrev = [
    { categoria: 'Sandwiches', nombre: 'Sandwich de Pollo',  precio: 12 },
    { categoria: 'Sandwiches', nombre: 'Sandwich de Lomo',  precio: 12 },
    { categoria: 'Helados', nombre: 'Helado de 1 bola', precio: 5 },
    { categoria: 'Helados', nombre: 'Helado de 2 bolas', precio: 8 },
    { categoria: 'Helados', nombre: 'Helado de 3 bolas', precio: 10 },
  ];

  itemsTest = [
    {
      categoria: 'Sandwiches',
      items: [
        { nombre: 'Sandwich de Pollo',  precio: 12 },
        { nombre: 'Sandwich de Lomo',  precio: 12 },
      ]
    },
    {
      categoria: 'Helados',
      items: [
        { nombre: 'Helado de 1 bola', precio: 5 },
        { nombre: 'Helado de 2 bolas', precio: 8 },
        { nombre: 'Helado de 3 bolas', precio: 10 },
      ]
    },
  ];

  constructor(
    private activatedRoute: ActivatedRoute,
    private afs: AngularFirestore,
    private fs: FirebaseService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe( params => {
      this.id = params.id;
      this.afs.collection('negocios').doc(this.id).valueChanges().subscribe( (res: Negocio) => {
        this.negocio = res;
        console.log(this.negocio);
      });
      this.fs.getItemsDocument(this.id).subscribe( res => {
        this.items = res;


        // this.itemsGroup = this.items.reduce((r, a) => {
        //   r[a.categoria] = r[a.categoria] || [];
        //   r[a.categoria].push(a);
        //   return r;
        // }, Object.create(null));
        // console.log(this.itemsGroup);
        // this.newArr = [];


        // const grp = this.items.reduce((group, product) => {
        //   const { categoria } = product;
        //   group[categoria] = group[categoria] ?? [];
        //   group[categoria].push(product);
        //   return group;
        // }, {});

        // // tslint:disable-next-line:forin
        // for (const obj in grp) {
        //   this.itemsGroup.push({ categoria: obj, items: grp[obj] });
        // }
        // console.log(this.itemsGroup, 'newArr');


        this.itemsGroup = this.items.reduce((prev, { categoria, ...items }) => {
          const id = prev.findIndex((item) => item.categoria === categoria);
          id >= 0
            ? prev[id].items.push(items)
            : prev.push({categoria, items: [items]});
          return prev;
        }, []);
        console.log(this.itemsGroup);


      });
    });
  }

}
