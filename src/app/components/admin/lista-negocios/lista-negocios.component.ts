import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { FirebaseService } from 'src/app/services/firebase.service';
import { AgregarNegocioComponent } from '../agregar-negocio/agregar-negocio.component';
// import { getStorage, ref, uploadBytes } from 'firebase/storage';
import { AngularFireStorage } from '@angular/fire/storage';

import { base64StringToBlob } from 'blob-util';
import { Router } from '@angular/router';
import { EditarNegocioComponent } from '../editar-negocio/editar-negocio.component';
import { MatDialog } from '@angular/material/dialog';
import { ShareComponent } from '../../public/share/share.component';


@Component({
  selector: 'app-lista-negocios',
  templateUrl: './lista-negocios.component.html',
  styleUrls: ['./lista-negocios.component.scss']
})
export class ListaNegociosComponent implements OnInit {

  negocios;

  opciones = [
    {
      nombre: 'Ver items',
      icon: 'list-details',
      function: (negocio) => this.verItems(negocio)
    },
    {
      nombre: 'Editar',
      icon: 'pencil',
      function: (negocio) => this.editarNegocio(negocio)
    },
    {
      nombre: 'Compartir',
      icon: 'share',
      function: (negocio) => this.compartirNegocio(negocio)
    },
    {
      nombre: 'Eliminar',
      icon: 'trash',
      function: () => this.eliminarNegocio()
    }
  ];

  public myAngularxQrCode = 'golxlkPQPcyGhnoLD6xO';

  constructor(
    private bottomSheet: MatBottomSheet,
    private afs: AngularFirestore,
    private fs: FirebaseService,
    private storage: AngularFireStorage,
    private router: Router,
    private matDialog: MatDialog
  ) { }

  ngOnInit(): void {
    // this.fs.getAllNegocios().subscribe( res => {
    //   this.negocios = res;
    // });
    this.fs.getNegociosPropios().subscribe( res => {
      this.negocios = res;
    });
  }

  addNegocio() {
    this.bottomSheet.open(AgregarNegocioComponent, {
      // panelClass: 'myBottomSheetFull',
      // data: this.paquetesRegulares
    });
  }

  convertBlobToBase64 = (blob) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
        resolve(reader.result);
    };
    reader.readAsDataURL(blob);
  })

  saveAsImage() {

    const canvas = document.getElementsByTagName('canvas');
    const dataURL = canvas[0].toDataURL();
    const myBase64 = dataURL.split(',');
    console.log(myBase64[1]);

    const contentType = 'image/png';
    const b64Data = myBase64[1];
    const myBlob = base64StringToBlob(b64Data, contentType);

    const filePath = 'myPicture1.png';
    const ref = this.storage.ref(filePath);
    ref.put(myBlob);

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

  verItems(negocio) {
    this.router.navigate(['admin/' + negocio.id]);
  }

  editarNegocio(negocio) {
    this.bottomSheet.open(EditarNegocioComponent, {
      data: negocio
    });
  }

  compartirNegocio(negocio) {
    this.matDialog.open(ShareComponent, {
      data: `/negocio/${negocio.id}`
    });
  }

  eliminarNegocio() {

  }

}
