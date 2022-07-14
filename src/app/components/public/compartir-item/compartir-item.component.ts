import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Negocio } from 'src/app/classes/negocio';

@Component({
  selector: 'app-compartir-item',
  templateUrl: './compartir-item.component.html',
  styleUrls: ['./compartir-item.component.scss']
})
export class CompartirItemComponent implements OnInit {

  urlShare: string;

  constructor(
    private dialogRef: MatDialogRef<CompartirItemComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackbar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.urlShare = `${window.location.origin}/negocio/${this.data.negocio.id}/item/${this.data.item.id}`;
  }

  cancelar() {
    this.dialogRef.close();
  }

  hecho() {
    this.dialogRef.close();
    this.snackbar.open('Copiado al portapeles', 'CERRAR', {
      duration: 3000
    });
  }

}
