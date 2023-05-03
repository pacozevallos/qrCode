import { Component, ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { MatSidenav } from '@angular/material/sidenav';
import { SidenavService } from 'src/app/services/sidenav.service';

@Component({
  selector: 'app-init',
  templateUrl: './init.component.html',
  styleUrls: ['./init.component.scss']
})
export class InitComponent {

  user: firebase.default.User;

  @ViewChild('sidenav', {static: true}) public sidenav!: MatSidenav;

  constructor(
    private sidenavService: SidenavService,
    private afAuth: AngularFireAuth
  ) {}

  ngOnInit() {

    this.sidenavService.setSidenav(this.sidenav);

    this.afAuth.authState.subscribe( user => {
      this.user = user;
    });

  }


}
