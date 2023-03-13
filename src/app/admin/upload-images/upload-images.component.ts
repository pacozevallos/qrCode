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
  // @Output() archivos = new EventEmitter<FileItem[]>();
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
  maxNumFotos = 4;
  fotosFirestore = [];
  visiblePreviewImages = true;
  sizeCollection: number;

  showButtonAddFile: boolean;
  showAlert: boolean;

  totalFotos: number;
  

  lista = [
    'Tamaño recomendado 600 x 600',
    `Puedes subir hasta ${this.maxNumFotos} fotos`
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

        // traer imágenes del item
        this.fs.getAllImagesItem(this.negocioId, this.itemId).subscribe( res => {
          this.fotosFirestore = res;
          this.fotos = [];
          this.sizeCollection = res.length;
          this.checkNumFotos();
        });

      });
    });

    console.log(this.itemId);
    this.checkNumFotos();

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
    this.checkNumFotos();
    this.uploadFiles();

  }

  uploadFiles() {
    this.totalFotos = this.fotosFirestore.length + this.fotos.length
    if ( this.totalFotos <= this.maxNumFotos) {
      this.uploadImages.uploadFilesItem(this.fotos, this.negocioId, this.itemId, this.sizeCollection)
    }
  }

  checkNumFotos() {
    this.totalFotos = this.fotosFirestore.length + this.fotos.length

    if ( this.totalFotos < this.maxNumFotos) {
      this.showButtonAddFile = true;
    } else {
      this.showButtonAddFile = false;
    }

    if ( this.totalFotos > this.maxNumFotos) {
      this.showAlert = true;
    } else {
      this.showAlert = false;
    }

  }

  removeItem(i: any) {
    this.fotos.splice(i, 1);
    this.checkNumFotos();
    this.uploadFiles();
  }

  drop(event: CdkDragDrop<any[]>) {
    moveItemInArray(this.fotosFirestore, event.previousIndex, event.currentIndex);

    this.fotosFirestore.map( (element: any, index: number )=> {
      this.afs.collection(`negocios/${this.negocioId}/items/${this.itemId}/images`).doc(element.id).update({
        order: index + 1
      });
    });

    this.afs.collection(`negocios/${this.negocioId}/items`).doc(this.itemId).update({
      image: this.fotosFirestore[0].urlImage
    });


  }

  deleteImageFromFirebase(item) {
    this.afs.collection('negocios').doc(this.negocioId).collection('items').doc(this.itemId).collection('images').doc(item.id).delete().then( () => {
      console.log('Eliminado de firestore');
      this.storage.ref(`imagesItems/${this.negocioId}/${this.itemId}/${item.nameImage}`).delete().subscribe( res => {
        console.log('Eliminado de Storage');
      });
    });
  }


}
