import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { MatDialogRef as MatDialogRef, MAT_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ColorEvent } from 'ngx-color';

@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.scss']
})
export class ColorComponent implements OnInit {

  newColor;

  constructor(
    private dialogRef: MatDialogRef<ColorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string,
  ) { }

  ngOnInit(): void {
  }

  changeColor($event: ColorEvent) {
    console.log($event.color);
    return this.newColor = $event.color.hex;
  }

}
