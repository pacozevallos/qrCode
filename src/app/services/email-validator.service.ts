import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map, delay } from 'rxjs/operators';
import { User } from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class EmailValidatorService {
  
  emailsArray = [];

  constructor(
    public afs: AngularFirestore
  ) {
    this.afs.collection('users').valueChanges().subscribe( res => {
      this.emailsArray = res.map((fil: User) => fil.email);
    })
  }

  checkIfIdExists(value: string) {
    return of(this.emailsArray.some((a) => a === value)).pipe();
  }

  validate(control: AbstractControl): Observable<ValidationErrors> | null {

    return this.checkIfIdExists(control.value)
    .pipe(map((result: boolean) =>
        result ? { idAlreadyExists: true } : null
      )
    );
  
  }

}
