import { Component, Inject, OnInit, SimpleChange, SimpleChanges } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { base64StringToBlob } from 'blob-util';
import { Negocio } from 'src/app/classes/negocio';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-qr-code',
  templateUrl: './qr-code.component.html',
  styleUrls: ['./qr-code.component.scss']
})
export class QrCodeComponent implements OnInit {

  qrCodeData = '';
  downloadURL: Observable<string>;
  loading = false;
  loadingQr = true;
  qrCodeImage: boolean;

  constructor(
    private bottomSheetRef: MatBottomSheetRef<QrCodeComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: Negocio,
    private afs: AngularFirestore,
    private storage: AngularFireStorage,
  ) { }

  ngOnInit(): void {
    console.log(this.data);
    
    this.qrCodeData = `${window.location.origin}/negocio/${this.data.id}`;

    if (this.data.qrCodeImage) {
      this.qrCodeImage = true;
    } else {
      this.qrCodeImage = false;
    }

  }

  ngOnChanges(changes: SimpleChange) {
    // console.log(this.data);
    console.log(changes);
  }

  createQrCode() {

    this.loading = true;

    const canvas = document.getElementsByTagName('canvas');
    const dataURL = canvas[0].toDataURL();
    const myBase64 = dataURL.split(',');

    const contentType = 'image/png';
    const b64Data = myBase64[1];
    const myBlob = base64StringToBlob(b64Data, contentType);

    const filePath = `imagesQrCodes/${this.data.id}.png`;
    const ref = this.storage.ref(filePath);
    const task = ref.put(myBlob);

    // this.uploadPercent = task.percentageChanges();
    task.snapshotChanges().pipe(
      finalize(() => {
        ref.getDownloadURL().toPromise().then( (url) => {
          this.downloadURL = url;

          this.afs.collection('negocios').doc(this.data.id).update({
            qrCodeImage: this.downloadURL,
            qrCodeImageName: filePath,
          });

          this.loading = false;
          this.qrCodeImage = true;
          console.log( this.downloadURL );
        }).catch(err => { console.log(err); } );
      })
    )
    .subscribe();
  }

  // detectarCargado() {
  //   return this.loadingQr = false;
  // }

  cancelar() {
    this.bottomSheetRef.dismiss();
  }

}
