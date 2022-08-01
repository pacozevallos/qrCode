import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { DataService } from 'src/app/services/data.service';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.scss']
})
export class PlanComponent implements OnInit {

  user;
  users = [];
  planActual;
  caracteristicasPlan = [];

  constructor(
    private fs: FirebaseService,
    private ds: DataService,
    private afAuth: AngularFireAuth,
  ) { }

  ngOnInit(): void {

    this.afAuth.authState.subscribe( user => {
      this.user = user;
    });

    this.fs.getUsersFirestore().subscribe( res => {
      this.users = res;
      console.log(this.users);
      
      this.planActual = this.users.find( user => user.uid === this.user.uid).plan;
      console.log(this.planActual);

      if (this.planActual === 'Free') {
        this.caracteristicasPlan = this.ds.planes.find( plan => plan.nombre === 'Free').caracteristicas;
      } else {
        
      }

    })

  
  
  }

}
