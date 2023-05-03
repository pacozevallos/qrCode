import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-politica',
  templateUrl: './modal-politica.component.html',
  styleUrls: ['./modal-politica.component.scss']
})
export class ModalPoliticaComponent {

  constructor(
    public dialogRef: MatDialogRef<ModalPoliticaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  cancelar() {
    this.dialogRef.close();
  }

}
