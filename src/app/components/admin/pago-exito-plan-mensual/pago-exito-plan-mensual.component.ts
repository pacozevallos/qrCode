import { AfterContentInit, AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { User } from 'src/app/classes/user';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-pago-exito-plan-mensual',
  templateUrl: './pago-exito-plan-mensual.component.html',
  styleUrls: ['./pago-exito-plan-mensual.component.scss']
})
export class PagoExitoPLanMensualComponent implements OnInit, AfterContentInit {

  user: User;
  userDoc;
  loading = false;
  alert = false;

  constructor(
    private af: AngularFirestore,
    private afa: AngularFireAuth,
    private fs: FirebaseService
  ) { }

  ngOnInit(): void {

    this.afa.authState.subscribe( res => {
      this.user = res;
      console.log(this.user);

      this.getDoc();
      
    });
    
  }

  ngAfterContentInit() {
   
  }

  getDoc() {
    this.fs.getUsers().subscribe( (res: User[]) => {
      this.userDoc = res.find( find => find.uid === this.user.uid );
      console.log(this.userDoc);

      if(this.userDoc.plan === 'Plan Power Mensual') {
        this.alert = true;
      } else {
        this.alert = false;
      }
      
    })
  }

  updatePlan() {
    this.loading = true;
    return this.af.collection('users').doc(this.userDoc.id).update({
      plan: 'Plan Power Mensual'
    }).then ( () => {
      this.loading = false;
      this.alert = true;
    })
  }

}
