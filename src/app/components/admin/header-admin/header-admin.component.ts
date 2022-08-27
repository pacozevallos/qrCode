import { Component, Input, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Negocio } from 'src/app/classes/negocio';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header-admin',
  templateUrl: './header-admin.component.html',
  styleUrls: ['./header-admin.component.scss']
})
export class HeaderAdminComponent implements OnInit {

  @Input() negocio: Negocio;

  user;

  linksAdmin = [
    // {
    //   nombre: 'Cuenta',
    //   icon: 'user',
    //   function: () => this.goToCuenta()
    // },
    // {
    //   nombre: 'Mi plan',
    //   icon: 'star',
    //   function: () => this.goToPlan()
    // },
    // {
    //   nombre: 'Cambiar contraseña',
    //   icon: 'key',
    //   function: () => this.goToContrasenia()
    // },
    {
      nombre: 'Cerrar sesión',
      icon: 'power',
      function: () => this.logout()
    }
  ];

  urlTienda: string;

  constructor(
    public auth: AuthService,
    public afAuth: AngularFireAuth,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.afAuth.authState.subscribe( user => {
      this.user = user;
    });
    this.urlTienda = `${window.location.origin}/tienda/${this.negocio.id}`;
  }

  goToCuenta() {
    this.router.navigate([`/admin/cuenta`]);
  }

  goToPlan() {
    this.router.navigate(['/admin/cuenta']);
  }

  goToContrasenia() {
    this.router.navigate(['/admin/contrasenia']);
  }

  logout() {
    this.auth.signOut();
  }


}
