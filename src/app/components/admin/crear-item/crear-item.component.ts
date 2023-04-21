import { Component, Inject, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { MatDialog as MatDialog } from '@angular/material/dialog';
// import firebase from 'firebase/compat/app';
// import { FileValidator } from 'ngx-material-file-input';
import { merge, Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { Negocio } from 'src/app/classes/negocio';
import { CrearCategoriaItemComponent } from '../crear-categoria-item/crear-categoria-item.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Timestamp } from 'firebase/firestore';
import { UploadImagesService } from 'src/app/services/upload-images.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FileItem } from 'src/app/classes/file-item';
import { Item } from 'src/app/classes/item';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-crear-item',
  templateUrl: './crear-item.component.html',
  styleUrls: ['./crear-item.component.scss']
})
export class CrearItemComponent implements OnInit {

  formItem: FormGroup;
  idItem: string;
  loading = false;
  negocio;
  categorias;
  itemRef: any;
  tipoPrecio = [
    'Precio único',
    'Precio variable'
  ];
  unico = true;
  multiple: boolean;


  selectedFile: FileList | null;
  nameItem: any;
  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;
  readonly maxSize = 1048576 * 5;
  actualSize: any;

  idNegocio: string;
  categoria: string;

  archivos: FileItem[] = [];
  negocioId: string;
  itemId: string;

  maxNumFotos: number;

  item: Item;
  

  constructor(
    private bottomSheetRef: MatBottomSheetRef<CrearItemComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: Negocio,
    private fb: FormBuilder,
    private afs: AngularFirestore,
    private storage: AngularFireStorage,
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private afAuth: AngularFireAuth,
    private uploadImages: UploadImagesService,
    private router: Router,
    private snackbar: MatSnackBar
  ) {

   

  }

  
  ngOnInit(): void {


    this.afAuth.authState.subscribe( res => {

      const user = res;

      this.afs.collection('negocios').valueChanges().subscribe( (res: any) => {

        // Traer negocio user
        this.negocio = res.find( (find: Negocio) => find.autorId === user.uid );
        this.negocioId = this.negocio.id;
        console.log(this.negocioId);

        // Traer categorías
        this.afs.collection(`negocios/${this.negocioId}/categorias`).valueChanges().subscribe( res => {
          this.categorias = res;
        });

        
        this.activatedRoute.params.subscribe( res => {

          this.itemId = res.id
          console.log(this.itemId);


          this.formItem = this.fb.group({
            id: [ this.itemId ],
            categoria: ['', Validators.required],
            nombre: ['', Validators.required],
            body: ['', Validators.required],
            precio: ['', Validators.required],
            tipoPrecio: ['Precio único', Validators.required],
            publicado: [true],
            destacado: [false],
            fechaCreacion: Timestamp.now()
          });
      
          this.formItem.get('tipoPrecio').valueChanges.subscribe( res => {
      
            if (res === 'Precio único') {
              this.unico = true;
              this.multiple = false;
              this.formItem.removeControl('precios');
              this.formItem.addControl('precio', this.fb.control('', Validators.required));
              this.formItem.addControl('precioDescuento', this.fb.control(''));
            }
      
            if (res === 'Precio variable') {
              this.unico = false;
              this.multiple = true;
              this.formItem.removeControl('precio');
              this.formItem.removeControl('precioDescuento');
              this.formItem.addControl('precios', this.fb.array([
                this.fb.group({
                  variante: ['', Validators.required],
                  precio: [0, Validators.required]
                })
              ]) );
      
              const arrayPrecios = this.formItem.controls.precios as FormArray;
              this.formItem.controls.precios.valueChanges.subscribe( multiple => {
                for (const i in multiple) {
                  arrayPrecios.at(+i).get('variante').setValidators(Validators.required);
                  arrayPrecios.at(+i).get('precio').setValidators(Validators.required);
                }
              });
            }
          });


        });

        
      });
      
    });
    

    

    

   

  }

  getMaxNumFotos(maxNumFotos: number) {
    this.maxNumFotos = maxNumFotos;
    console.log(this.maxNumFotos);
    
  }

  getArchivos(archivos: FileItem[]) {
    this.archivos = archivos;
    console.log(this.archivos.length);
  }


  // uploadArchivos() {
  //   if (this.archivos.length ) {
  //   }
  //   this.uploadImages.uploadFilesItem(this.archivos, this.negocioId, this.itemId)
  // }

  // && this.archivos.length <= this.maxNumFotos

  onSubmit() {
    if (this.formItem.valid) {
      this.loading = true;
      this.crearItem();
    } else {
      this.validateAllFormFields(this.formItem);
    }
  }

  crearItem() {
    this.afs.doc( `negocios/${this.negocioId}/items/${this.itemId}`).set(this.formItem.value, {merge: true})
    .then(() => {
      console.log('item creado');
      this.router.navigate(['/admin/productos']);
      this.snackbar.open('Ítem creado', 'CERRAR', {
        duration: 5000
      });
    });
  }

  agregarPrecio() {
    (this.formItem.controls.precios as FormArray).push(
      this.fb.group({
        variante: [''],
        precio: [0],
      })
    );
  }

  eliminarPrecio(index: number): void {
    (this.formItem.controls.precios as FormArray).removeAt(index);
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


  openModalCrearCategoriaItem() {
    const dialogRef = this.dialog.open(CrearCategoriaItemComponent, {
      autoFocus: false,
      panelClass: 'dialogSmall',
      data: {
        idNegocio: this.negocioId,
        categoria: this.categoria
      }
    });
    dialogRef.afterClosed().subscribe( result => {
      console.log(result);
      this.formItem.get('categoria').setValue(result);
    });
  }


  detectFiles(event) {
    this.selectedFile = event.target.files[0];
    this.nameItem = event.target.files[0].name;
    console.log(this.nameItem);
  }



  uploadFileCrearItem() {
    const nombreImage = this.nameItem.split('.');

    const file = this.selectedFile;
    const filePath = `imagesItems/${this.data.id}/${this.itemId}.${nombreImage[1]}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);

    this.uploadPercent = task.percentageChanges();
    task.snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().toPromise().then( (url) => {
          this.downloadURL = url;

          const objectItem = this.formItem.value;
          delete objectItem.image;

          this.itemRef.set(objectItem);
          this.itemRef.set({
            image: this.downloadURL,
            imageName: `${this.itemId}.${nombreImage[1]}`,
          }, {merge: true});
          this.bottomSheetRef.dismiss();
          console.log( this.downloadURL );
        }).catch(err => { console.log(err); } );
      })
    )
    .subscribe();
  }

  cancelar() {
    this.bottomSheetRef.dismiss();
  }


  errorImagen() {
    return this.formItem.controls.image.hasError('required') ? 'La imagen es necesaria' :
    this.formItem.controls.image.hasError('maxContentSize') ? 'El peso no debe exceder los 5 MB' : '';
  }

  errorBody() {
    return this.formItem.controls['body'].touched && this.formItem.controls['body'].hasError('required') ? 'Incluye una descripción' : '';
  }

}
