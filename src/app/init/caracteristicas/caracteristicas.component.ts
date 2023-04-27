import { Component } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-caracteristicas',
  templateUrl: './caracteristicas.component.html',
  styleUrls: ['./caracteristicas.component.scss']
})
export class CaracteristicasComponent {

  caracteristicas = [];

  constructor(
    private ds: DataService
  ) {}

  ngOnInit() {
    this.caracteristicas = this.ds.caracteristicas;
  }

}
