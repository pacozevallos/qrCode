import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Timestamp } from 'firebase/firestore';
import { FileItem } from '../classes/file-item';

@Injectable({
  providedIn: 'root'
})
export class UploadImagesService {

  loading: boolean;
  resultados = [];

  constructor(
    private storage: AngularFireStorage,
    private afs: AngularFirestore
  ) { }

  uploadFilesItem( fotos: FileItem[], negocioId: string, itemId: string ) {

    this.loading = true;

    // Guardar en Storage
    const promises = fotos.map( (image, i: number) => {

      const imageToServer = this.storage.ref(`imagesItems/${negocioId}/${itemId}/${image.nameArchivo}`).put(image.archivo, {
        customMetadata: {
          name: image.nameArchivo,
          type: image.typeArchivo,
          size: image.sizeArchivo.toString(),
        }
      });

      imageToServer.percentageChanges().subscribe( res => {
        image.progreso = res;
        console.log(res);
      });

      // console.log(this.uploadPercent);

      return imageToServer.then( (uploadTaskSnapshot: any) => {
        const nameImage = image.nameArchivo;
        
        return uploadTaskSnapshot.ref.getDownloadURL()
        .then( (url: any) => {
          console.log(url, nameImage);
          return { url, nameImage }
        });
      });
    })

    


    // Guardar en Firestore
    Promise.all(promises)
    .then( (response: any) => {

      console.log(response);

      response.map( (element: any, index: number) => {

        const refImage = this.afs.collection('negocios').doc(negocioId).collection('items').doc(itemId).collection('images').doc().ref.id;

        const imageComplete = {
          urlImage: element.url,
          nameImage: element.nameImage,
          fechaCreacion: Timestamp.now(),
          destacado: false,
          order: index + 1,
          publicado: true,
          id: refImage
        }
        this.resultados.push(imageComplete);
      });

      console.log(this.resultados);

      this.resultados.map( element => {
        this.afs.collection('negocios').doc(negocioId).collection('items').doc(itemId).collection('images').doc(element.id).set(element)
      });
     
    })
    .catch( error => {
      console.log(error);
    });

  }



}
