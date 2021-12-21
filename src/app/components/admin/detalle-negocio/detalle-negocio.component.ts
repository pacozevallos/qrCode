import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { ActivatedRoute } from '@angular/router';
import { Negocio } from 'src/app/classes/negocio';
import { FirebaseService } from 'src/app/services/firebase.service';
import { CrearItemComponent } from '../crear-item/crear-item.component';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-detalle-negocio',
  templateUrl: './detalle-negocio.component.html',
  styleUrls: ['./detalle-negocio.component.scss']
})
export class DetalleNegocioComponent implements OnInit {

  idNegocio: string;
  negocio;

  constructor(
    private activatedRoute: ActivatedRoute,
    private afs: AngularFirestore,
    private fs: FirebaseService,
    private bottomSheet: MatBottomSheet,
    private bottomSheetRef: MatBottomSheetRef

  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe( params => {
      this.idNegocio = params.id;


      // traer los datos del negocio
      this.afs.doc('negocios/' + this.idNegocio).valueChanges().subscribe( res => {
        this.negocio = res;
      });

      // this.bottomSheetRef.containerInstance._animationStateChanged = this.negocio;

    });
  }

  addItem() {
    this.bottomSheet.open(CrearItemComponent, {
      data: this.negocio
    });
  }


}
