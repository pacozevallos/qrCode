import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cambiar-plan',
  templateUrl: './cambiar-plan.component.html',
  styleUrls: ['./cambiar-plan.component.scss']
})
export class CambiarPLanComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<CambiarPLanComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackbar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  cancelar() {
    this.dialogRef.close();
  }


}
