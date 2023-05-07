import { Component } from '@angular/core';

@Component({
  selector: 'app-menu-admin',
  templateUrl: './menu-admin.component.html',
  styleUrls: ['./menu-admin.component.scss']
})
export class MenuAdminComponent {

  linksAdmin = [
    {
      nombre: 'Productos',
      url: 'productos',
      icon: 'building-store',
      active: true
    },
    {
      nombre: 'Categorías',
      url: 'categorias',
      icon: 'category',
    },
    {
      nombre: 'Configuración',
      url: 'configuracion',
      icon: 'settings',
    },
    {
      nombre: 'Mi Cuenta',
      url: 'cuenta',
      icon: 'user-circle',
    },
  ];

}
