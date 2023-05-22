import { Component } from '@angular/core';
import { DialogRef } from '@angular/cdk/dialog';

@Component({
  selector: 'app-mejora-plan',
  templateUrl: './mejora-plan.component.html',
  styleUrls: ['./mejora-plan.component.scss']
})
export class MejoraPlanComponent {

  constructor(
    public dialogRef: DialogRef<MejoraPlanComponent>,
  ) {}

}
