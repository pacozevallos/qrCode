
import { DialogRef } from '@angular/cdk/dialog';
import { Component, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-close-dialog',
  templateUrl: './close-dialog.component.html',
  styleUrls: ['./close-dialog.component.scss']
})
export class CloseDialogComponent {

  @Input() dialogRef: DialogRef;

  cancelar() {
    this.dialogRef.close();
  }

}
