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
    this.afs.collection(`negocios/${this.data.idNegocio}/items/${this.data.item.id}/images`).valueChanges().subscribe( res => {
      console.log(res);
    });
  }

  eliminarItem() {

    this.loader = true;

    this.afs.collection(`negocios/${this.data.idNegocio}/items`).doc(this.data.item.id).delete()
    .then(() => {
      this.dialogRef.close();
      this.snackBar.open('Item eliminado', 'CERRAR', {
        duration: 3000,
      });
    });

    // Delete images from Firestore
    const refImages = this.afs.collection(`negocios/${this.data.idNegocio}/items/${this.data.item.id}/images`);

    refImages.valueChanges().subscribe( res => {

      // res.map( (element: any) => {
      //   refImages.doc(element.id).delete();
      //   // this.storage.ref(`imagesItems/${this.data.idNegocio}/${this.data.item.id}/${element.nameImage}`).delete();
      // });

      res.forEach( (element: any) => {
        this.storage.ref(`imagesItems/${this.data.idNegocio}/${this.data.item.id}/${element.nameImage}`)?.delete().subscribe( () => {
          console.log(res);
          refImages.doc(element.id)?.delete();
        });
      });



    });

  }

  cancelar() {
    this.dialogRef.close();
  }

}
