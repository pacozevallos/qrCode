import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Item } from 'src/app/classes/item';
import { FirebaseService } from 'src/app/services/firebase.service';
import { SwiperOptions } from 'swiper';
import SwiperCore, { Autoplay, Navigation, Pagination, Scrollbar, A11y, EffectFlip, EffectCreative } from 'swiper';
SwiperCore.use([Autoplay, Navigation, Pagination, Scrollbar, A11y, EffectFlip, EffectCreative  ]);

@Component({
  selector: 'app-destacados-negocio',
  templateUrl: './destacados-negocio.component.html',
  styleUrls: ['./destacados-negocio.component.scss']
})
export class DestacadosNegocioComponent implements OnInit {

  idNegocio: string;
  items: Item[] = [];
  itemsGroup = [];
  itemsDestacados = [];

  config: SwiperOptions = {
    spaceBetween: 20,
    // pagination: { clickable: true },
    breakpoints: {
      0: {
        slidesPerView: 2.3,
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
        slidesPerView: 6,
        spaceBetween: 20
      },
    }
  };

  constructor(
    private fs: FirebaseService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe( params => {
      this.idNegocio = params.id;

      this.fs.getItemsDestacados(this.idNegocio).subscribe( res => {
        this.itemsDestacados = res;
        console.log(this.itemsDestacados);
        
      });

      this.fs.getItemsDocument(this.idNegocio).subscribe( res => {
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
