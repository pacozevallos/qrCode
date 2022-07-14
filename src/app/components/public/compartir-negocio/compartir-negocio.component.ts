import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Negocio } from 'src/app/classes/negocio';

@Component({
  selector: 'app-compartir-negocio',
  templateUrl: './compartir-negocio.component.html',
  styleUrls: ['./compartir-negocio.component.scss']
})
export class CompartirNegocioComponent implements OnInit {

  urlShare: string;

  constructor(
    private dialogRef: MatDialogRef<CompartirNegocioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Negocio,
    private snackbar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.urlShare = `${window.location.origin}/negocio/${this.data.id}`
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
