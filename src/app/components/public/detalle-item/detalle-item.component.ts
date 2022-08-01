import { Component, Inject, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Item } from 'src/app/classes/item';
import { AngularFirestore } from '@angular/fire/firestore';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ShareComponent } from '../share/share.component';
import { Negocio } from 'src/app/classes/negocio';
import { CompartirItemComponent } from '../compartir-item/compartir-item.component';

@Component({
  selector: 'app-detalle-item',
  templateUrl: './detalle-item.component.html',
  styleUrls: ['./detalle-item.component.scss']
})
export class DetalleItemComponent implements OnInit {


  idNegocio: string;
  idItem: string;
  item: any;
  negocio: Negocio;

  constructor(
    private activatedRoute: ActivatedRoute,
    private afs: AngularFirestore,
    private matDialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit(): void {

    
    this.idNegocio = this.activatedRoute.parent.snapshot.params.id;
    this.idItem = this.activatedRoute.snapshot.params.id;

    this.afs.collection('negocios').doc(this.idNegocio).collection('items').doc(this.idItem).valueChanges().subscribe( data => {
      this.item = data;
      console.log(data);
    });

    this.afs.collection('negocios').doc(this.idNegocio).valueChanges().subscribe( (res: Negocio) => {
      this.negocio = res;
    });


  }


  compartirItem() {
    this.matDialog.open(CompartirItemComponent, {
      panelClass: 'modalSmall',
      data: {
        negocio: this.negocio,
        item: this.item
      }
    });
  }

}
