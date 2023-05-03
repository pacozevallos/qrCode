import { Component, Input } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { SidenavService } from 'src/app/services/sidenav.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {

  @Input() user;

  links = [];

  constructor(
    private sidenav: SidenavService,
    private ds: DataService,
    private afAuth: AngularFireAuth,
    private router: Router
  ) { }

  ngOnInit() {
    this.links = this.ds.links;
  }

  goToRegistro() {
    this.router.navigate(['/registro']).then( () => {
      this.closeSidenav();
    });
  }

  goToLogin() {
    this.router.navigate(['/login']).then( () => {
      this.closeSidenav();
    });
  }

  closeSidenav() {
    this.sidenav. toggle();
  }

  signOut() {
    this.afAuth.signOut().then(() => {
      this.closeSidenav();
    });
  }
  

}
