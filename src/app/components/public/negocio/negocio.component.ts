import { Component, OnInit } from '@angular/core';
import { Negocio } from 'src/app/classes/negocio';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Item } from '../../../classes/item';
// import Swiper core and required modules
import SwiperCore, { SwiperOptions, Pagination } from 'swiper';

import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
// install Swiper modules
SwiperCore.use([Pagination]);

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
  itemsDestacados = [];
  ahora = new Date();
  today: number = Date.now();

  public myAngularxQrCode: string = null;

  config: SwiperOptions = {
    spaceBetween: 20,
    // pagination: { clickable: true },
    breakpoints: {
      0: {
        slidesPerView: 2.5,
        spaceBetween: 12
      },
      576: {
        slidesPerView: 3,
        spaceBetween: 20
      },
      768: {
        slidesPerView: 4,
        spaceBetween: 20
      },
      992: {
        slidesPerView: 4,
        spaceBetween: 20
      },
      1200: {
        slidesPerView: 5,
        spaceBetween: 20
      },
      1400: {
        slidesPerView: 5,
        spaceBetween: 20
      },
    }
  };

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
  ) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe( params => {
      this.id = params.id;
      console.log(this.id);
      this.myAngularxQrCode = `https://qrcode/${this.id}`;
      console.log(this.myAngularxQrCode);

      this.fs.getItemsDestacados(this.id).subscribe( res => {
        this.itemsDestacados = res;
      });

      this.afs.collection('negocios').doc(this.id).valueChanges().subscribe( (res: Negocio) => {
        this.negocio = res;
        console.log(this.negocio);
      });

      this.fs.getItemsDocument(this.id).subscribe( res => {
        this.items = res;
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


  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.itemsGroup, event.previousIndex, event.currentIndex);
    console.log(this.itemsGroup);
  }



  // drop(event: CdkDragDrop<any[]>) {
  //   if (event.previousContainer === event.container) {
  //     moveItemInArray(this.itemsGroup, event.previousIndex, event.currentIndex);
  //   } else {
  //     transferArrayItem(event.previousContainer.data,
  //                       this.itemsGroup,
  //                       event.previousIndex,
  //                       event.currentIndex);
  //     // if transfer, recalculate the order of previous (the list from drag)
  //     event.previousContainer.data.forEach((x, index) => {
  //         x.order = index;
  //     });
  //   }
  //   // always, recalculate the order of the container (the list to drag)
  //   this.itemsGroup.forEach((x, index) => {
  //     x.order = index;
  //   });
  //   console.log(this.itemsGroup);
  // }



  // getItemsDestacados(id: string) {
  //   this.fs.getItemsDestacados(id).subscribe( res => {
  //     this.itemsDestacados = res;
  //     console.log(this.itemsDestacados);
  //   });
  // }

}
