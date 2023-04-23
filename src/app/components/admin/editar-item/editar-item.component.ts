import { Component, Inject, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { MatDialog as MatDialog } from '@angular/material/dialog';
import { MatSlideToggleChange as MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import firebase from 'firebase/compat/app';
import { Timestamp } from 'firebase/firestore';
// import { FileValidator } from 'ngx-material-file-input';
import { Observable, merge } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { Item } from 'src/app/classes/item';
import { Negocio } from 'src/app/classes/negocio';
import { CrearCategoriaItemComponent } from '../crear-categoria-item/crear-categoria-item.component';

@Component({
  selector: 'app-editar-item',
  templateUrl: './editar-item.component.html',
  styleUrls: ['./editar-item.component.scss']
})
export class EditarItemComponent implements OnInit {

  formItem: FormGroup;
  idItem: string;
  loading = false;
  negocio;
  categorias;
  itemRef: any;



  selectedFile: FileList | null;
  nameItem: any;
  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;
  readonly maxSize = 1048576 * 5;
  actualSize: any;

  tipoPrecio = [
    'Precio único',
    'Precio variable'
  ];
  unico = true;
  multiple: boolean;

  categoria: string;

  negocioId: string;
  itemId: string;
  item: Item;

  constructor(
    private bottomSheetRef: MatBottomSheetRef<EditarItemComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    private fb: FormBuilder,
    private afs: AngularFirestore,
    private storage: AngularFireStorage,
    public dialog: MatDialog,
    private afAuth: AngularFireAuth,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackbar: MatSnackBar
  ) {
    // this.itemRef = this.afs.collection('negocios/').doc(this.data.id).collection('items').ref.doc();
    // console.log(this.itemRef.id);
  }

  ngOnInit(): void {


    
    // console.log(this.data);
    // // this.categorias = this.data.categorias,

    // // traer solo categorias en tiempo real
    // this.afs.doc('negocios/' + this.data.idNegocio).valueChanges().subscribe( (res: Negocio) => {
    //   this.categorias = res.categorias;
    //   console.log(res);
    // });

    // this.formItem = this.fb.group({
    //   id: [ this.data.item.id ],
    //   destacado: [this.data.item.destacado, Validators.required],
    //   publicado: [ this.data.item.publicado, Validators.required],
    //   categoria: [ this.data.item.categoria, Validators.required],
    //   nombre: [this.data.item.nombre, Validators.required],
    //   descripcion: [this.data.item.descripcion],
    //   precio: [this.data.item.precio, Validators.required],
    //   // precioDescuento: [this.data.item.precioDescuento],
    //   tipoPrecio: [this.data.item.tipoPrecio, Validators.required],
    //   image: [''],
    //   imageName: [''],
    //   fechaEdicion: [firebase.firestore.Timestamp.fromDate(new Date())]
    // });

    // if (this.data.item.tipoPrecio === 'Individual') {
    //   this.individual = true;
    //   this.multiple = false;
    // }


    // if (this.data.item.tipoPrecio === 'Variable') {
    //   this.individual = false;
    //   this.multiple = true;
    //   this.formItem.removeControl('precio');
    //   this.formItem.removeControl('precioDescuento');
    //   this.formItem.addControl('precios', this.fb.array([]));
    //   this.data.item.precios.forEach(element => {
    //     const arrayPrecios = this.formItem.controls.precios as FormArray;
    //     arrayPrecios.push(
    //       this.fb.group({
    //         variante: [element.variante, Validators.required],
    //         precio: [element.precio, Validators.required],
    //       })
    //     );
    //   });
    // }

    // this.formItem.get('tipoPrecio').valueChanges.subscribe( res => {

    //   if (res === 'Individual') {
    //     this.individual = true;
    //     this.multiple = false;
    //     this.formItem.removeControl('precios');
    //     this.formItem.addControl('precio', this.fb.control('', Validators.required));
    //     this.formItem.addControl('precioDescuento', this.fb.control(''));
    //   }

    //   if (res === 'Variable') {
    //     this.individual = false;
    //     this.multiple = true;
    //     this.formItem.removeControl('precio');
    //     this.formItem.removeControl('precioDescuento');
    //     this.formItem.addControl('precios', this.fb.array([
    //       this.fb.group({
    //         variante: ['', Validators.required],
    //         precio: ['', Validators.required]
    //       })
    //     ]));
    //     const arrayPrecios = this.formItem.controls.precios as FormArray;
    //     this.formItem.controls.precios.valueChanges.subscribe( multiple => {
    //       for (const i in multiple) {
    //         arrayPrecios.at(+i).get('variante').setValidators(Validators.required);
    //         arrayPrecios.at(+i).get('precio').setValidators(Validators.required);
    //       }
    //     });
    //   }
    // });










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
    
          this.afs.doc(`negocios/${this.negocioId}/items/${this.itemId}`).valueChanges().subscribe( (res: Item | undefined) => {
    
            this.item = res;
            console.log(this.item);
    
            this.formItem = this.fb.group({
              id: [ this.itemId ],
              categoria: [this.item.categoria, Validators.required],
              nombre: [this.item.nombre, Validators.required],
              body: [this.item.body, Validators.required],
              precio: [this.item.precio, Validators.required],
              tipoPrecio: [this.item.tipoPrecio, Validators.required],
              // publicado: [true],
              // destacado: [false],
              fechaEdicion: Timestamp.now()
            });


            if (this.item.tipoPrecio === 'Precio único') {
              this.unico = true;
              this.multiple = false;
              this.formItem.removeControl('precios');
              this.formItem.addControl('precio', this.fb.control('', Validators.required));
            }



            if (this.item.tipoPrecio === 'Precio variable') {
              this.unico = false;
              this.multiple = true;
              this.formItem.removeControl('precio');
              this.formItem.removeControl('precioDescuento');
              this.formItem.addControl('precios', this.fb.array([]));
              this.item.precios.forEach(element => {
                const arrayPrecios = this.formItem.controls.precios as FormArray;
                arrayPrecios.push(
                  this.fb.group({
                    variante: [element.variante, Validators.required],
                    precio: [element.precio, Validators.required],
                  })
                );
              });
            }



    
            this.formItem.get('tipoPrecio').valueChanges.subscribe( res => {
    
              if (res === 'Precio único') {
                this.unico = true;
                this.multiple = false;
                this.formItem.removeControl('precios');
                this.formItem.addControl('precio', this.fb.control('', Validators.required));
              }
        
              if (res === 'Precio variable') {
                this.unico = false;
                this.multiple = true;
                this.formItem.removeControl('precio');
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
      
    });


  }



  onSubmit() {
    if (this.formItem.valid) {
      this.loading = true;
      this.updateItem();
    } else {
      this.validateAllFormFields(this.formItem);
    }
  }


  updateItem() {
    this.afs.doc( `negocios/${this.negocioId}/items/${this.itemId}`).update(this.formItem.value)
    .then(() => {
      console.log('item actualizado');
      this.router.navigate(['/admin/productos']);
      this.snackbar.open('Ítem actualizado', 'CERRAR', {
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

  actualizarPublicado(idItem, change: MatSlideToggleChange) {
    // this.fs.updatePublicado(key, e);
    this.afs.collection('negocios').doc(this.data.idNegocio).collection('items').doc(idItem).update({
      publicado: change.checked
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

  openModalCrearCategoriaItem() {
    const dialogRef = this.dialog.open(CrearCategoriaItemComponent, {
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

    this.itemRef = this.afs.doc('negocios/' + this.data.idNegocio).collection('items').doc(this.data.item.id);

    // this.itemRef = this.afs.collection('negocios/').doc(this.data.id).collection('items').ref.doc();
    // console.log(this.itemRef.id);

    const file = this.selectedFile;
    const filePath = `imagesItems/${this.data.idNegocio}/${this.data.item.id}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);

    this.uploadPercent = task.percentageChanges();
    task.snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().toPromise().then( (url) => {
          this.downloadURL = url;

          const item = this.formItem.value;
          const image = this.downloadURL;
          const imageName = `${this.itemRef.id}.${nombreImage[1]}`;
          const newItem = { ...item, image, imageName };
          this.itemRef.update(newItem);

          this.bottomSheetRef.dismiss();
          console.log( this.downloadURL );
        }).catch(err => { console.log(err); } );
      })
    )
    .subscribe();
  }

  errorImagen() {
    return this.formItem.controls.image.hasError('required') ? 'La imagen es necesaria' :
    this.formItem.controls.image.hasError('maxContentSize') ? 'El peso no debe exceder los 5 MB' : '';
  }

  cancelar() {
    this.bottomSheetRef.dismiss();
  }

  errorBody() {
    return this.formItem.controls['body'].touched && this.formItem.controls['body'].hasError('required') ? 'Incluye una descripción' : '';
  }

}
