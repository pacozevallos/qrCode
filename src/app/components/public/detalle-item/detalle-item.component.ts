import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Item } from 'src/app/classes/item';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-detalle-item',
  templateUrl: './detalle-item.component.html',
  styleUrls: ['./detalle-item.component.scss']
})
export class DetalleItemComponent implements OnInit {

  idNegocio: string;
  idItem: string;
  item: any;


  constructor(
    private activatedRoute: ActivatedRoute,
    private afs: AngularFirestore,
    private router: Router
  ) { }

  ngOnInit(): void {

    const myUrl = this.activatedRoute.snapshot.url;
    this.idNegocio = myUrl[1].path;
    this.idItem = myUrl[3].path;


    this.afs.collection('negocios').doc(this.idNegocio).collection('items').doc(this.idItem).valueChanges().subscribe( data => {
      this.item = data;
      console.log(data);
    });

  }

}
