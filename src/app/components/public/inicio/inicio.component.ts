import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {

  caracteristicas = [];

  constructor(
    private ds: DataService
  ) { }

  ngOnInit(): void {
    this.caracteristicas = this.ds.caracteristicas;
  }

}
