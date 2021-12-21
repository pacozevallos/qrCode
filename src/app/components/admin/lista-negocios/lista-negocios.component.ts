import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { FirebaseService } from 'src/app/services/firebase.service';
import { AgregarNegocioComponent } from '../agregar-negocio/agregar-negocio.component';

@Component({
  selector: 'app-lista-negocios',
  templateUrl: './lista-negocios.component.html',
  styleUrls: ['./lista-negocios.component.scss']
})
export class ListaNegociosComponent implements OnInit {

  negocios;

  constructor(
    private bottomSheet: MatBottomSheet,
    private afs: AngularFirestore,
    private fs: FirebaseService
  ) { }

  ngOnInit(): void {
    this.fs.getAllNegocios().subscribe( res => {
      this.negocios = res;
    });
  }

  addNegocio() {
    this.bottomSheet.open(AgregarNegocioComponent, {
      // data: this.paquetesRegulares
    });
  }

}
