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
  items: Item[] = [];

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
        console.log(this.items);
        const groupByCategory = this.items.map( product => {
          return product.categoria;
        });
        console.log(groupByCategory);
      });
    });
  }

}
