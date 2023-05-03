import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-terminos',
  templateUrl: './modal-terminos.component.html',
  styleUrls: ['./modal-terminos.component.scss']
})
export class ModalTerminosComponent {

  constructor(
    public dialogRef: MatDialogRef<ModalTerminosComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  cancelar() {
    this.dialogRef.close();
  }


}
