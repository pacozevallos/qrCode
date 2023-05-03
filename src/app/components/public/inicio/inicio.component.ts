import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {

  caracteristicas = [];

  constructor(
    private ds: DataService,
    private afs: AngularFirestore
  ) { }

  ngOnInit(): void {
    this.caracteristicas = this.ds.caracteristicas;
    // this.afs.collection('negocios').doc('alsa').valueChanges().subscribe( res => {
    //   console.log(res);
    // });
  }

}
