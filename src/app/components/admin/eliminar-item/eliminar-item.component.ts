import { Component, Inject, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
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
    console.log(this.data);
  }

  eliminarNoticia(imageName) {
    this.loader = true;

    // this.fs.deleteNoticia(itemId)
    this.afs.collection('negocios').doc(this.data.idNegocio_).collection('items').doc(this.data.item_.id).delete()
    .then(() => {
      this.dialogRef.close();
      this.snackBar.open('Producto eliminado', 'CERRAR', {
        duration: 3000,
      });
      console.log('Item eliminado de Firestore');

    });

    this.storage.ref(`imagesItems/${this.data.idNegocio_}/${this.data.item_.id}`).delete();
  }

  cancelar() {
    this.dialogRef.close();
  }

}
