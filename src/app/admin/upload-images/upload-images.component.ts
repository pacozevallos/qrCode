import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { Index, Timestamp } from '@angular/fire/firestore';

import { FirebaseService } from 'src/app/services/firebase.service';
import { Item } from 'src/app/classes/item';
import { Negocio } from 'src/app/classes/negocio';
import { AngularFireAuth } from '@angular/fire/compat/auth';

import { DomSanitizer } from '@angular/platform-browser';
import { FileItem } from 'src/app/classes/file-item';

@Component({
  selector: 'app-upload-images',
  templateUrl: './upload-images.component.html',
  styleUrls: ['./upload-images.component.scss']
})
export class UploadImagesComponent {

  @Input() itemId!: string;
  @Output() archivos = new EventEmitter<FileItem[]>();

  fotos: FileItem[] = [];
  disabled = true;
  uploadPercent: Observable<number>;
  downloadURL!: Observable<string>;
  urlsImages: any[] = [];
  resultados: any[] = [];
  loading = false;
  fotoTipo!: string;
  avisoSuccess = false;
  negocioId: string;
  imagesPreview = [];
  maxFotos = false;
  maxButton = true;
  fotosServer = [];

  lista = [
    'Tamaño recomendado 600 x 600',
    'Puedes subir hasta 8 fotos'
  ]

  constructor(
    private storage: AngularFireStorage,
    private afs: AngularFirestore,
    private activatedRoute: ActivatedRoute,
    private fs: FirebaseService,
    private afAuth: AngularFireAuth,
    public sanitizer: DomSanitizer
  ) { }

  ngOnInit() {

    // traer solo el negocio del usuario
    this.afAuth.authState.subscribe( res => {
      const user = res;
      this.afs.collection('negocios').valueChanges().subscribe( (res: any) => {
        const negocio = res.find( (find: Negocio) => find.autorId === user.uid );
        this.negocioId = negocio.id;
      });
    });

    console.log(this.itemId);

  }


  getFileDetails (event: any) {

    document.getElementById('formFileMultiple').click();

    const files = event.target.files;

    for (let i = 0; i < files?.length; i++) {
      const nuevoArchivo = new FileItem(files[i]);
      this.fotos.push(nuevoArchivo);
      nuevoArchivo.imgUrl = URL.createObjectURL(files[i]);
    }

    console.log(this.fotos);

    if (this.fotos.length <= 8) {
      // this.uploadFilesItem();
      this.emitirImages(this.fotos);
    } else {
      this.getLengthFotos();
    }

  }


  removeItem(event: any, i: any) {

    this.fotos.splice(i, 1);
    console.log(this.fotos);

    this.getLengthFotos();
  }

  getLengthFotos() {
    if (this.fotos.length > 8) {
      this.maxFotos = true;
    } else {
      this.maxFotos = false;
    }

    if (this.fotos.length > 7) {
      this.maxButton = false;
    } else {
      this.maxButton = true;
    }
  }

  emitirImages(images: FileItem[]) {
    this.archivos.emit(images);
  }


  uploadFilesItem() {

    this.loading = true;

    // Guardar en Storage
    const promises = this.fotos.map( (image, i: number) => {

      const imageToServer = this.storage.ref(`imagesItems/${this.negocioId}/${this.itemId}/${image.nameArchivo}`).put(image.archivo, {
        customMetadata: {
          name: image.nameArchivo,
          type: image.typeArchivo,
          size: image.sizeArchivo.toString(),
        }
      });

      // image.progreso = imageToServer.percentageChanges();
      // this.uploadPercent.subscribe( res => console.log(res + `[${i}]`))

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

        const refImage = this.afs.collection('negocios').doc(this.negocioId).collection('items').doc(this.itemId).collection('images').doc().ref.id;

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
        this.afs.collection('negocios').doc(this.negocioId).collection('items').doc(this.itemId).collection('images').doc(element.id).set(element)
        .then( () => {
          this.avisoSuccess = true;
        });
      })
     
    })
    .catch( error => {
      console.log(error);
    });

  }


  // getImagesFirestore() {
  //   this.afs.collection('negocios').doc(this.negocioId).collection('items').doc(this.itemId).collection('images').valueChanges().subscribe( res => {
  //     this.fotosServer = res;
  //   });
  // }


}
