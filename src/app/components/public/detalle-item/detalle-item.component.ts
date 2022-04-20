import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Item } from 'src/app/classes/item';
import { AngularFirestore } from '@angular/fire/firestore';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ShareComponent } from '../share/share.component';
import { Negocio } from 'src/app/classes/negocio';

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
    // private matBottomSheetRef: MatBottomSheetRef<DetalleItemComponent>,
    // @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    private activatedRoute: ActivatedRoute,
    private afs: AngularFirestore,
    private matDialog: MatDialog
  ) { }

  ngOnInit(): void {

    const myUrl = this.activatedRoute.snapshot.url;
    this.idNegocio = myUrl[1].path;
    this.idItem = myUrl[3].path;

    this.afs.collection('negocios').doc(this.idNegocio).collection('items').doc(this.idItem).valueChanges().subscribe( data => {
      this.item = data;
      console.log(data);
    });

    this.afs.collection('negocios').doc(this.idNegocio).valueChanges().subscribe( (res: Negocio) => {
      this.negocio = res;
    });

    // this.idNegocio = this.data.idNegocio;
    // this.item = this.data.item;

  }

  // cancelar() {
  //   this.matBottomSheetRef.dismiss();
  // }

  compartirItem() {
    this.matDialog.open(ShareComponent, {
      panelClass: 'modalSmall',
      // data: `/negocio/${this.idNegocio}/item/${this.idItem}`
      data: {
        negocio: this.negocio,
        item: this.item
      }
    });
  }

}
