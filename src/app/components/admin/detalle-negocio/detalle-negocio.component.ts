import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { ActivatedRoute } from '@angular/router';
import { Negocio } from 'src/app/classes/negocio';
import { FirebaseService } from 'src/app/services/firebase.service';
import { CrearItemComponent } from '../crear-item/crear-item.component';
import { map } from 'rxjs/operators';
import { EditarItemComponent } from '../editar-item/editar-item.component';
import { EditarNegocioComponent } from '../editar-negocio/editar-negocio.component';
import { VistaQrComponent } from '../vista-qr/vista-qr.component';

@Component({
  selector: 'app-detalle-negocio',
  templateUrl: './detalle-negocio.component.html',
  styleUrls: ['./detalle-negocio.component.scss']
})
export class DetalleNegocioComponent implements OnInit {

  idNegocio: string;
  negocio;
  opciones = [
    {
      nombre: 'Compartir negocio',
      icon: 'share',
      function: () => this.verCodigoQr()
    },
    {
      nombre: 'Editar negocio',
      icon: 'pencil',
      function: () => this.editarNegocio()
    },
    {
      nombre: 'Mi cuenta',
      icon: 'user',
      function: () => this.editarNegocio()
    }
  ];

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

  verCodigoQr() {
    this.bottomSheet.open(VistaQrComponent, {
      // panelClass: 'myBottomSheetFull',
      data: this.negocio
    });
  }

  editarNegocio() {
    this.bottomSheet.open(EditarNegocioComponent, {
      // panelClass: 'myBottomSheetFull',
      data: this.negocio
    });
  }

  addItem() {
    this.bottomSheet.open(CrearItemComponent, {
      // panelClass: 'myBottomSheetFull',
      data: this.negocio
    });
  }


}
