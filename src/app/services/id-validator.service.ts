import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map, delay } from 'rxjs/operators';
import { Negocio } from '../classes/negocio';

@Injectable({
  providedIn: 'root'
})
export class IdValidatorService implements AsyncValidator {

  private existingUsernames = ['Batman', 'Superman', 'Joker', 'Luthor'];
  idsArray = [];

  constructor(
    public afs: AngularFirestore
  ) {
    this.afs.collection('negocios').valueChanges().subscribe( res => {
      this.idsArray = res.map((fil: Negocio) => fil.id);
    })
  }

  checkIfIdExists(value: string) {
    return of(this.idsArray.some((a) => a === value)).pipe();
  }

  validate(control: AbstractControl): Observable<ValidationErrors> | null {

    return this.checkIfIdExists(control.value)
    .pipe(map((result: boolean) =>
        result ? { idAlreadyExists: true } : null
      )
    );
  
  }


}
