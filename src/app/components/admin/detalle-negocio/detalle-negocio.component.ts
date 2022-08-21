import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Negocio } from 'src/app/classes/negocio';
import { AngularFireAuth } from '@angular/fire/auth';
import { FirebaseService } from '../../../services/firebase.service';

@Component({
  selector: 'app-detalle-negocio',
  templateUrl: './detalle-negocio.component.html',
  styleUrls: ['./detalle-negocio.component.scss']
})
export class DetalleNegocioComponent implements OnInit {

  idNegocio: string;
  negocio;

  links = [
    {
      nombre: 'Productos',
      url: 'productos'
    },
    {
      nombre: 'Configuración',
      url: 'configuracion'
    },
    {
      nombre: 'Mi Cuenta',
      url: 'cuenta'
    },
  ];

  activeLink = this.links[0];
  user;

  constructor(
    private afs: AngularFirestore,
    private afAuth: AngularFireAuth,
    private fs: FirebaseService

  ) { }

  ngOnInit(): void {

    // traer solo el negocio del usuario
    this.afAuth.authState.subscribe( user => {
      this.user = user;
      // this.afs.collection('negocios').valueChanges().subscribe( res => {
      //   console.log(res);
      //   const negocioRef = res.find( (find: Negocio) => find.autorId === this.user.uid );
      //   this.negocio = negocioRef;
      // });
      this.afs.collection('negocios').doc('alsa').valueChanges().subscribe( res => {
        // console.log(res);
        this.negocio = res;
      });
    });


    // setTimeout( () => {
    //   this.afs.collection('negocios').doc('alsa').valueChanges().subscribe( res => {
    //     console.log(res);
    //     this.negocio = res;
    //   });
    // }, 3000)

  }

}
