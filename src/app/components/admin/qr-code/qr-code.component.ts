import { ChangeDetectorRef, Component, Inject, Input, OnInit, SimpleChange, SimpleChanges } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { base64StringToBlob } from 'blob-util';
import { Negocio } from 'src/app/classes/negocio';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { QrCodeService } from 'src/app/services/qr-code.service';

@Component({
  selector: 'app-qr-code',
  templateUrl: './qr-code.component.html',
  styleUrls: ['./qr-code.component.scss']
})
export class QrCodeComponent implements OnInit {

  @Input() negocio: Negocio;

  qrCodeData = '';
  downloadURL: Observable<string>;
  loading = false;
  loadingQr = true;
  qrCodeImage: boolean;
  // negocio: Negocio;

  opciones = [
    'Permite a tu público acceder a tu tienda desde cualquier lugar',
    'Puedes imprimirlo y mostrarlo en un lugar visible de tu local',
    'Fácil rápido y siempre actualizado'
  ];

  constructor(
    private bottomSheetRef: MatBottomSheetRef<QrCodeComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: Negocio,
    private afs: AngularFirestore,
    private storage: AngularFireStorage,
    private changeDetectorRef: ChangeDetectorRef,
    private qrs: QrCodeService
  ) {
      // this.changeDetectorRef.markForCheck();
    }

  ngOnInit(): void {
    // console.log(this.data);

    this.qrCodeData = `${window.location.origin}/tienda/${this.negocio.id}`;
    console.log(this.qrCodeData);

    this.qrCodeImage = false;

    this.afs.doc('negocios/' + this.negocio.id).valueChanges().subscribe( (data: Negocio) => {
      this.negocio = data;
      if (this.negocio.qrCodeImage) {
        this.qrCodeImage = true;
      } else {
        this.qrCodeImage = false;
      }
      // this.changeDetectorRef.detectChanges();
    });

  }

  onSubmit() {
    this.qrs.createQrCode(this.negocio.id)
  }



  createQrCode() {

    this.loading = true;

    const canvas = document.getElementsByTagName('canvas');
    const dataURL = canvas[0].toDataURL();
    const myBase64 = dataURL.split(',');

    const contentType = 'image/png';
    const b64Data = myBase64[1];
    const myBlob = base64StringToBlob(b64Data, contentType);

    const filePath = `imagesQrCodes/${this.negocio.id}.png`;
    const ref = this.storage.ref(filePath);
    const task = ref.put(myBlob);

    // this.uploadPercent = task.percentageChanges();
    task.snapshotChanges().pipe(
      finalize(() => {
        ref.getDownloadURL().toPromise().then( (url) => {
          this.downloadURL = url;

          this.afs.collection('negocios').doc(this.negocio.id).update({
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

  detectarCargado() {
    return this.loadingQr = false;
  }

  cancelar() {
    this.bottomSheetRef.dismiss();
  }

}
