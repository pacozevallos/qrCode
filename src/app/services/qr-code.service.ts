import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { base64StringToBlob } from 'blob-util';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class QrCodeService {

  constructor(
    private afs: AngularFirestore,
    private storage: AngularFireStorage
  ) { }


  createQrCode(idNegocio: string) {


    const canvas = document.getElementsByTagName('canvas');
    const dataURL = canvas[0].toDataURL();
    const myBase64 = dataURL.split(',');

    const contentType = 'image/png';
    const b64Data = myBase64[1];
    const myBlob = base64StringToBlob(b64Data, contentType);

    const filePath = `imagesQrCodes/${idNegocio}.png`;
    const ref = this.storage.ref(filePath);
    const task = ref.put(myBlob);

    // this.uploadPercent = task.percentageChanges();
    task.snapshotChanges().pipe(
      finalize(() => {
        ref.getDownloadURL().toPromise().then( (url) => {
          // this.downloadURL = url;

          this.afs.collection('negocios').doc(idNegocio).update({
            qrCodeImage: url,
            qrCodeImageName: filePath,
          });
          
          console.log(url);
        }).catch(err => { console.log(err); } );
      })
    )
    .subscribe();
  }




}
