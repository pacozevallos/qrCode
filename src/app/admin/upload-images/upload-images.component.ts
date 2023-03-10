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
import { UploadImagesService } from 'src/app/services/upload-images.service';

import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-upload-images',
  templateUrl: './upload-images.component.html',
  styleUrls: ['./upload-images.component.scss']
})
export class UploadImagesComponent {

  @Input() itemId!: string;
  @Output() archivos = new EventEmitter<FileItem[]>();
  @Output() maxNumFiles = new EventEmitter<number>();

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
  maxNumFotos = 8;
  fotosFirestore = [];
  visiblePreviewImages = true;
  sizeCollection: number;
  

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
    public sanitizer: DomSanitizer,
    private uploadImages: UploadImagesService
  ) { }

  ngOnInit() {

    // traer solo el negocio del usuario
    this.afAuth.authState.subscribe( res => {
      const user = res;
      this.afs.collection('negocios').valueChanges().subscribe( (res: any) => {
        const negocio = res.find( (find: Negocio) => find.autorId === user.uid );

        this.negocioId = negocio.id;

        // // Traer itemId
        // this.activatedRoute.params.subscribe( res => {
        //   this.itemId = res.id
        //   console.log(this.itemId);
        // });

        // traer imágenes del item
        this.fs.getAllImagesItem(this.negocioId, this.itemId).subscribe( res => {
          this.fotosFirestore = res;
          this.fotos = [];
          this.sizeCollection = res.length;
        });


      });
    });

    console.log(this.itemId);

    // this.getImagesFirestore();

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

    if (this.fotos.length <= this.maxNumFotos) {
      this.uploadImages.uploadFilesItem(this.fotos, this.negocioId, this.itemId, this.sizeCollection)
    } else {
      this.getLengthFotos();
    }

    // this.emitirMaxNumFotos();
    // this.emitirImages(this.fotos);

  }

  emitirMaxNumFotos() {
    this.maxNumFiles.emit(this.maxNumFotos)
  }

  emitirImages(images: FileItem[]) {
    if (this.fotos.length <= this.maxNumFotos) {
      this.archivos.emit(images);
    } else {
      this.getLengthFotos()
    }
  }

  getLengthFotos() {
    if (this.fotos.length > this.maxNumFotos) {
      this.maxFotos = true;
    } else {
      this.maxFotos = false;
    }

    if (this.fotos.length > (this.maxNumFotos - 1) ) {
      this.maxButton = false;
    } else {
      this.maxButton = true;
    }
  }


  removeItem(event: any, i: any) {
    this.fotos.splice(i, 1);
    // console.log(this.fotos);
    this.getLengthFotos();
    this.emitirImages(this.fotos);
  }

  drop(event: CdkDragDrop<any[]>) {
    moveItemInArray(this.fotos, event.previousIndex, event.currentIndex);
    this.fotos.map( (element: any, index: number )=> {
      this.afs.collection(`negocios/${this.negocioId}/items/${this.itemId}/images`).doc(element.id).update({
        order: index + 1
      });
    });
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
  //   this.fs.getAllImagesItem(this.negocioId, this.itemId).subscribe( res => {
  //     this.fotosFirestore = res;
  //     console.log(this.fotosFirestore);
  //   });
  // }

  deleteImageFromFirebase(item) {

    // this.storage.ref(`imagesItems/${this.negocioId}/${this.itemId}/${item.nameImage}`).delete().subscribe( res => {
    //   console.log('Eliminado de Storage');
    //   this.afs.collection('negocios').doc(this.negocioId).collection('items').doc(this.itemId).collection('images').doc(item.id).delete().then( () => {
    //     console.log('Eliminado de firestore');
    //   });
    // });


    this.afs.collection('negocios').doc(this.negocioId).collection('items').doc(this.itemId).collection('images').doc(item.id).delete().then( () => {
      console.log('Eliminado de firestore');
      this.storage.ref(`imagesItems/${this.negocioId}/${this.itemId}/${item.nameImage}`).delete().subscribe( res => {
        console.log('Eliminado de Storage');
      });
    });



  }


}
