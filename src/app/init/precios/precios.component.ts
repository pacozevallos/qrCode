import { Component } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { MatRadioChange as MatRadioChange } from '@angular/material/radio';

@Component({
  selector: 'app-precios',
  templateUrl: './precios.component.html',
  styleUrls: ['./precios.component.scss']
})
export class PreciosComponent {

  planes = [];
  estado: any;

  planPower;
  opcionesPlanPower;
  opcionSelect;

  planFree;

  caracteristicasPlanFree = [
    'Hasta 20 productos',
    'Vende por WhatsApp',
    'Personaliza tu negocio',
    'Cambios en tiempo real',
    'Comparte con código QR',
  ];

  caracteristicasPlanPower = [
    'Productos ilimitados',
    'Vende por WhatsApp',
    'Personaliza tu negocio',
    'Cambios en tiempo real',
    'Comparte con código QR',
    'Asistencia técnica'
  ];

  power = {
    nombre: 'Power',
    opciones: [
      {
        nombre: 'Mensual',
        precio: 2.90,
        periodo: 'mes',
        selected: true,
        url: 'https://www.mercadopago.com.pe/subscriptions/checkout?preapproval_plan_id=2c93808482584b4d01825cbd109e02ee'
      },
      {
        nombre: 'Anual',
        precio: 29.90,
        periodo: 'año',
        selected: false,
        url: 'https://www.mercadopago.com.pe/subscriptions/checkout?preapproval_plan_id=2c93808482584b4d01825cc05d9f02ef'
      },
    ],
  }


  constructor(
    private ds: DataService
  ) {}

  ngOnInit() {
    this.planes = this.ds.planes;
    this.estado = 'Mensual';
  }

  radioChange(event: MatRadioChange) {
    return this.estado = event.value;
  }

  goToUrl(plan) {
    if (plan === 'Power' ) {
      return this.goToUrlOpcion(this.estado);
    }
    if (plan === 'Free' ) {
      return this.goToPlanFree();
    }
  }

  goToUrlOpcion(opcion) {
    if (this.estado === opcion) {
      this.planPower = this.planes.find(find0 => find0.nombre === 'Power');
      this.opcionesPlanPower = this.planPower.opciones;
      this.opcionSelect = this.opcionesPlanPower.find(find2 => find2.nombre === opcion);
      return this.opcionSelect.url;
    }
  }

  goToPlanFree() {
    this.planFree = this.planes.find(find3 => find3.nombre === 'Free');
    return this.planFree.urlButton;
  }

}
