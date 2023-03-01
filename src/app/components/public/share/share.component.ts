import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef as MatDialogRef, MAT_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar as MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-share',
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.scss']
})
export class ShareComponent implements OnInit {

  urlShare;

  constructor(
    private dialogRef: MatDialogRef<ShareComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackbar: MatSnackBar,
    private router: Router

  ) {

  }

  // const dataURL = canvas[0].toDataURL();
  // const myBase64 = dataURL.split(',');

  ngOnInit(): void {
    console.log(this.data);
    const currentUrl = window.location.href;
    console.log(currentUrl);
    console.log(this.router.url);


    if (this.router.url === `/negocio/${this.data.negocio.id}`) {
      this.urlShare = currentUrl;
    }

    if (this.router.url === `/negocio/${this.data.negocio.id}/item/${this.data.item?.id}`) {
      this.urlShare = currentUrl;
    }

    if (this.router.url === '/admin') {
      const urlNegocio = currentUrl.replace(`admin`, `negocio/${this.data.negocio.id}`);
      this.urlShare = urlNegocio;
    }

    if (this.router.url === `/admin/${this.data.negocio.id}`) {
      this.urlShare = `${window.location.origin}/negocio/${this.data.negocio.id}`;
    }

    if (this.router.url === `/admin/${this.data.negocio.id}/productos`) {
      this.urlShare = `${window.location.origin}/negocio/${this.data.negocio.id}/item/${this.data.item?.id}`;
    }

    if (this.router.url === `/admin/${this.data.negocio.id}/productos/${this.data.item?.id}`) {
      this.urlShare = `${window.location.origin}/negocio/${this.data.negocio.id}/item/${this.data.item?.id}`;
    }


    // if(this.router.url === `/admin/${this.data.negocio.id}`) {
    //   const urlNegocio = currentUrl.replace(`admin`, `negocio`);
    //   console.log(urlNegocio);
    //   this.urlShare = urlNegocio + `/item/${this.data.item.id}`;
    //   console.log(this.urlShare);
    // }


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
