import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  user;

  links = [
 
    {
      nombre: 'Características',
      url: '/caracteristicas'
    },
    {
      nombre: 'Precios',
      url: '/precios'
    },
    {
      nombre: 'Contacto',
      url: '/contacto'
    },

  ]

  linksAdmin = [
    {
      nombre: 'Ir a mi panel',
      icon: 'settings',
      function: () => this.goToAdmin()
    },
    {
      nombre: 'Cerrar sesión',
      icon: 'power',
      function: () => this.logout()
    }
  ];

  constructor(
    public auth: AuthService,
    public afAuth: AngularFireAuth,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.afAuth.authState.subscribe( user => {
      this.user = user;
    });
  }

  goToAdmin() {
    this.router.navigate(['/admin/productos']);
  }

  goToCuenta() {
    this.router.navigate(['/admin/cuenta']);
  }

  goToPlan() {
    this.router.navigate(['/admin/plan']);
  }

  goToContrasenia() {
    this.router.navigate(['/admin/contrasenia']);
  }

  logout() {
    this.auth.signOut();
  }

}
