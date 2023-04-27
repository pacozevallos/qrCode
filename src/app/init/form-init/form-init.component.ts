import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-init',
  templateUrl: './form-init.component.html',
  styleUrls: ['./form-init.component.scss']
})
export class FormInitComponent {

  hrefCurrent = `qatu.app/tienda/`;
  negocioId: string;
  nombreTienda = new FormControl('', Validators.required)

  ngOnInit() {

    console.log(window.location);

    this.nombreTienda.valueChanges.subscribe( res => {
      const negocioIdSpace = res.replace(/ /g, '-');
      this.negocioId = negocioIdSpace.toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '');
      // this.nombreTienda.setValue(this.negocioId);
      this.nombreTienda.patchValue(this.negocioId, {emitEvent: false});

      // if (this.nombreTienda.invalid) {
      //   const negocioIdNew = `${this.negocioId}2`;
      //   this.nombreTienda.setValue(negocioIdNew);
      // }
      
    });
    
  }

}
