import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import firebase from 'firebase/app';

import { QRCodeComponent, QRCodeElementType, QRCodeErrorCorrectionLevel, QRCodeModule } from 'angularx-qrcode';

@Component({
  selector: 'app-agregar-negocio',
  templateUrl: './agregar-negocio.component.html',
  styleUrls: ['./agregar-negocio.component.scss']
})
export class AgregarNegocioComponent implements OnInit {

  formNegocio: FormGroup;
  idNegocio: string;
  loading = false;

  tiposNegocio = [
    'Restaurante',
    'Restobar',
    'Cafetería',
    'Heladería',
    'Juguería',
    'Discoteca',
    'Pub',
    'Bar',
  ];

  public myAngularxQrCode: string = null;

  @ViewChild('parent') parent: ElementRef;

  constructor(
    private bottomSheetRef: MatBottomSheetRef<AgregarNegocioComponent>,
    private fb: FormBuilder,
    private afs: AngularFirestore
  ) {
    this.idNegocio = this.afs.collection('negocios').ref.doc().id;
    console.log(this.idNegocio);

    this.myAngularxQrCode = `https://qrcode/${this.idNegocio}`;
    console.log(this.myAngularxQrCode);
  }

  ngOnInit(): void {
    this.formNegocio = this.fb.group({
      nombre: ['', Validators.required],
      tipo: ['', Validators.required],
      direccion: ['', Validators.required],
      categorias: new FormArray([]),
      id: [this.idNegocio, Validators.required],
      fechaCreacion: [firebase.firestore.Timestamp.fromDate(new Date())]
    });
  }

  onSubmit() {
    if (this.formNegocio.valid) {
      this.loading = true;
      this.crearItem();
    } else {
      this.validateAllFormFields(this.formNegocio);
    }
  }

  crearItem() {
    this.afs.doc('negocios/' + this.idNegocio).set(this.formNegocio.value)
    .then(() => {
      this.bottomSheetRef.dismiss();
    });
  }

  saveAsImage(parent) {
    const parentElement = parent.nativeElement.querySelector('img').src;
    const blobData = this.convertBase64ToBlob(parentElement);

    const storageRef = firebase.storage().ref();
    const ref = storageRef.child('qr.png');
    ref.put(blobData)
    .then( () => {
      console.log('Uploaded a data_url string!');
    });
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  private convertBase64ToBlob(Base64Image: any) {
    // SPLIT INTO TWO PARTS
    const parts = Base64Image.split(';base64,');
    // HOLD THE CONTENT TYPE
    const imageType = parts[0].split(':')[1];
    // DECODE BASE64 STRING
    const decodedData = window.atob(parts[1]);
    // CREATE UNIT8ARRAY OF SIZE SAME AS ROW DATA LENGTH
    const uInt8Array = new Uint8Array(decodedData.length);
    // INSERT ALL CHARACTER CODE INTO UINT8ARRAY
    for (let i = 0; i < decodedData.length; ++i) {
      uInt8Array[i] = decodedData.charCodeAt(i);
    }
    // RETURN BLOB IMAGE AFTER CONVERSION
    return new Blob([uInt8Array], { type: imageType });
  }

}
