import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-share',
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.scss']
})
export class ShareComponent implements OnInit {

  myUrl;

  constructor(
    private dialogRef: MatDialogRef<ShareComponent>,
    private snackbar: MatSnackBar
  ) {

  }

  ngOnInit(): void {
    this.myUrl = window.location.href;
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
