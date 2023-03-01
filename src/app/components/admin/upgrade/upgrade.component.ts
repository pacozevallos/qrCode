import { Component, OnInit } from '@angular/core';
import { MatDialogRef as MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-upgrade',
  templateUrl: './upgrade.component.html',
  styleUrls: ['./upgrade.component.scss']
})
export class UpgradeComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<UpgradeComponent>,
  ) { }

  ngOnInit(): void {
  }

  cancelar() {
    this.dialogRef.close();
  }

}
