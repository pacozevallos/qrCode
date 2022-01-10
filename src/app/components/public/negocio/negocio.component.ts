import { Component, OnInit } from '@angular/core';
import { Negocio } from 'src/app/classes/negocio';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-negocio',
  templateUrl: './negocio.component.html',
  styleUrls: ['./negocio.component.scss']
})
export class NegocioComponent implements OnInit {

  id: string;
  negocio: Negocio;

  constructor(
    private activatedRoute: ActivatedRoute,
    private afs: AngularFirestore
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe( params => {
      this.id = params.id;
      this.afs.collection('negocios').doc(this.id).valueChanges().subscribe( (res: Negocio) => {
        this.negocio = res;
        console.log(this.negocio);
      });
    });
  }

}
