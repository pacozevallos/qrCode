import { Component, Inject, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { MatDialogRef as MatDialogRef, MAT_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar as MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-eliminar-negocio',
  templateUrl: './eliminar-negocio.component.html',
  styleUrls: ['./eliminar-negocio.component.scss']
})
export class EliminarNegocioComponent implements OnInit {

  loader: boolean;
  items = [];

  constructor(
    private dialogRef: MatDialogRef<EliminarNegocioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackBar: MatSnackBar,
    private afs: AngularFirestore,
    private storage: AngularFireStorage,
    private fs: FirebaseService,
    private router: Router
  ) { }

  ngOnInit(): void {
    console.log(this.data);
    this.fs.getAllItemsDocument(this.data.id).subscribe( res => {
      this.items = res;
      console.log(this.items);
    });
  }

  eliminarNegocio() {

    this.loader = true;

    // Eliminar todas las imágenes de los items del negocio en Storage
    const itemsFilter = this.items.filter( fil => fil.imageName !== '');
    if ( this.items.length >= 1) {
      itemsFilter.forEach( element => {
        this.storage.ref(`imagesItems/${this.data.id}/${element.imageName}`).delete();
      });
    }

    // Eliminar image QR Code de Storage
    this.storage.ref(`imagesQrCodes/${this.data?.qrCodeImageName}`).delete();

    // Eliminar logo de Storage
    this.storage.ref(`imagesLogosNegocios/${this.data?.imageLogoName}`).delete();

    // Eliminar todos los items de la base de datos Firestore
    this.items.forEach( element => {
      this.afs.collection('negocios').doc(this.data.id).collection('items').doc(element.id).delete();
    });

    // Eliminar negocio de la base de datos Firestore
    this.afs.collection('negocios').doc(this.data.id).delete()
    .then(() => {
      this.dialogRef.close();
      this.snackBar.open('negocio eliminado', 'CERRAR', {
        duration: 3000
      });
      console.log('negocio eliminado');
      this.router.navigate(['/admin']);
    });

  }

  cancelar() {
    this.dialogRef.close();
  }


}
