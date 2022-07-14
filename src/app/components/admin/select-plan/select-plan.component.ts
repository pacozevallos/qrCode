import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-select-plan',
  templateUrl: './select-plan.component.html',
  styleUrls: ['./select-plan.component.scss']
})
export class SelectPLanComponent implements OnInit {

  planes = [];

  constructor(
    private ds: DataService
  ) { }

  ngOnInit(): void {
    this.planes = this.ds.planes;
  }

}
