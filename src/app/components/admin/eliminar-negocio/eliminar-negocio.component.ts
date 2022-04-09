import { Component, Inject, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-eliminar-negocio',
  templateUrl: './eliminar-negocio.component.html',
  styleUrls: ['./eliminar-negocio.component.scss']
})
export class EliminarNegocioComponent implements OnInit {

  loader: boolean;

  constructor(
    private dialogRef: MatDialogRef<EliminarNegocioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackBar: MatSnackBar,
    private afs: AngularFirestore,
    private storage: AngularFireStorage
  ) { }

  ngOnInit(): void {
    console.log(this.data);
  }

  eliminarNegocio() {
    this.loader = true;
    this.afs.collection('negocios').doc(this.data.id).collection('items').doc().delete();
    this.afs.collection('negocios').doc(this.data.id).delete()
    .then(() => {
      this.dialogRef.close();
      this.snackBar.open('negocio eliminado', 'CERRAR', {
        duration: 3000,
      });
    });
    this.storage.ref(`imagesItems/${this.data.id}/`).delete();
  }

  cancelar() {
    this.dialogRef.close();
  }


}
