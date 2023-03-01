import { Component, Inject, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { MatDialogRef as MatDialogRef, MAT_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar as MatSnackBar } from '@angular/material/snack-bar';
import { Item } from 'src/app/classes/item';

@Component({
  selector: 'app-eliminar-item',
  templateUrl: './eliminar-item.component.html',
  styleUrls: ['./eliminar-item.component.scss']
})
export class EliminarItemComponent implements OnInit {

  loader: boolean;

  constructor(
    // private fs: FirebaseService,
    private dialogRef: MatDialogRef<EliminarItemComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackBar: MatSnackBar,
    private afs: AngularFirestore,
    private storage: AngularFireStorage
  ) { }

  ngOnInit(): void {
    console.log(this.data.item.id);
  }

  eliminarItem() {

    this.loader = true;

    // Eliminar imagen de storage
    this.storage.ref(`imagesItems/${this.data.idNegocio}/${this.data.item.imageName}`).delete();

    // Eliminar item de base de datos Firestore
    this.afs.collection('negocios').doc(this.data.idNegocio).collection('items').doc(this.data.item.id).delete()
    .then(() => {
      this.dialogRef.close();
      this.snackBar.open('Item eliminado', 'CERRAR', {
        duration: 3000,
      });
      console.log('Item eliminado de Firestore');
    });

  }

  cancelar() {
    this.dialogRef.close();
  }

}
