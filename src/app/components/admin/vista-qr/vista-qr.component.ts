import { Component, Inject, OnInit } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { Negocio } from 'src/app/classes/negocio';

@Component({
  selector: 'app-vista-qr',
  templateUrl: './vista-qr.component.html',
  styleUrls: ['./vista-qr.component.scss']
})
export class VistaQrComponent implements OnInit {

  constructor(
    private bottomSheetRef: MatBottomSheetRef<VistaQrComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: Negocio,
  ) { }

  ngOnInit(): void {
  }

  cancelar() {
    this.bottomSheetRef.dismiss();
  }


}
