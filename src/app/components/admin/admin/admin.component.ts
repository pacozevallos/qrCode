import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Negocio } from 'src/app/classes/negocio';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  idNegocio: string;
  negocio;

  links = [
    {
      nombre: 'Productos',
      url: 'productos'
    },
    {
      nombre: 'Categorías',
      url: 'categorias'
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
    private afAuth: AngularFireAuth

  ) { }

  ngOnInit(): void {

    // traer solo el negocio del usuario
    this.afAuth.authState.subscribe( user => {
      this.user = user;

      this.afs.collection('negocios').valueChanges().subscribe( res => {
        this.negocio = res.find( (find: Negocio) => find.autorId === this.user.uid );
      });

    });


  }


}
