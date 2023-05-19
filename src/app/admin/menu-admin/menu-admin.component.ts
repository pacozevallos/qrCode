import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { UserProfile } from 'firebase/auth';
import { Negocio } from 'src/app/classes/negocio';

@Component({
  selector: 'app-menu-admin',
  templateUrl: './menu-admin.component.html',
  styleUrls: ['./menu-admin.component.scss']
})
export class MenuAdminComponent {

  @Input() user: UserProfile;
  @Input() negocio: Negocio;

  urlTienda: string;

  origin = window.location.origin;

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

  constructor(
    private cd: ChangeDetectorRef
  ) {}

  // ngOnInit(): void {
  //   this.urlTienda = `${window.location.origin}/tienda/${this.negocio?.id}`;
  // }

  ngAfterViewInit() {
    
    this.urlTienda = `${window.location.origin}/tienda/${this.negocio?.id}`;
    this.cd.detectChanges();
  
  }

}
