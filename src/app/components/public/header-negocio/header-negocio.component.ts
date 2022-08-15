import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router, Event, NavigationStart, NavigationEnd } from '@angular/router';
import { Negocio } from 'src/app/classes/negocio';
import { CompartirNegocioComponent } from '../compartir-negocio/compartir-negocio.component';
import { ShareComponent } from '../share/share.component';

@Component({
  selector: 'app-header-negocio',
  templateUrl: './header-negocio.component.html',
  styleUrls: ['./header-negocio.component.scss']
})
export class HeaderNegocioComponent implements OnInit, OnChanges {

  id;
  negocio: Negocio;
  loader = true;
  back: boolean;


  constructor(
    private activatedRoute: ActivatedRoute,
    private afs: AngularFirestore,
    private matDialog: MatDialog,
    private router: Router
  ) {

    this.router.events.subscribe( (event: Event) => {
      if (event instanceof NavigationStart) {
        this.back = event.url === `/tienda/${this.id}` ? false : true;
      }
    });
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe( params => {
      this.id = params.id;
      // console.log(this.id);

      this.afs.collection('negocios').doc(this.id).valueChanges().subscribe( (res: Negocio) => {
        this.negocio = res;
        this.loader = false;
      });

      this.back = this.router.url === `/tienda/${this.id}` ? false : true;

    });

  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
  }

  compartirNegocio() {
    this.matDialog.open(CompartirNegocioComponent, {
      panelClass: 'modalSmall',
      data: this.negocio
    });
  }

}
