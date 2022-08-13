import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Negocio } from 'src/app/classes/negocio';

@Component({
  selector: 'app-share-admin',
  templateUrl: './share-admin.component.html',
  styleUrls: ['./share-admin.component.scss']
})
export class ShareAdminComponent implements OnInit {

  @Input() negocio: Negocio;

  urlShare: string;

  constructor(
    private snackbar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.urlShare = `${window.location.origin}/negocio/${this.negocio.id}`
  }

  hecho() {
    this.snackbar.open('Copiado al portapeles', 'CERRAR', {
      duration: 3000
    });
  }

}
