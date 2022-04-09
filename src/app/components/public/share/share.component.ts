import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackbar: MatSnackBar
  ) {

  }

  // const dataURL = canvas[0].toDataURL();
  // const myBase64 = dataURL.split(',');

  ngOnInit(): void {
    console.log(this.data);
    const newUrl = window.location.href;
    this.myUrl = newUrl.replace('/admin', `/negocio/${this.data.id}`);
    console.log(this.myUrl);
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
