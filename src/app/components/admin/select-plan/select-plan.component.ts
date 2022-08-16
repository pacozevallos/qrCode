import { Component, OnInit } from '@angular/core';
import { MatRadioChange } from '@angular/material/radio';
import { find } from 'rxjs/operators';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-select-plan',
  templateUrl: './select-plan.component.html',
  styleUrls: ['./select-plan.component.scss']
})
export class SelectPLanComponent implements OnInit {

  planes = [];
  estado;

  planPower;
  opcionesPlanPower;
  opcionSelect;

  planFree;

  constructor(
    private ds: DataService
  ) { }

  ngOnInit(): void {
    this.planes = this.ds.planes;
    this.estado = 'Mensual';
  }

  radioChange(event: MatRadioChange) {
    return this.estado = event.value;
  }

  goToUrl(plan) {
    if (plan === 'Plan Power' ) {
      return this.goToUrlOpcion(this.estado);
    }
    if (plan === 'Plan Free' ) {
      return this.goToPlanFree();
    }
  }

  goToUrlOpcion(opcion) {
    if (this.estado === opcion) {
      this.planPower = this.planes.find(find0 => find0.nombre === 'Plan Power');
      this.opcionesPlanPower = this.planPower.opciones;
      this.opcionSelect = this.opcionesPlanPower.find(find2 => find2.nombre === opcion);
      return this.opcionSelect.url;
    }
  }


  goToPlanFree() {
    this.planFree = this.planes.find(find3 => find3.nombre === 'Plan Free');
    return this.planFree.urlButton;
  }

}
