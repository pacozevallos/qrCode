import { Component, Inject, inject } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-eliminar-categoria',
  templateUrl: './eliminar-categoria.component.html',
  styleUrls: ['./eliminar-categoria.component.scss']
})
export class EliminarCategoriaComponent {


  formCategoria: FormGroup;
  categoriasFilter = [];
  itemsEnUso = [];
  enUso: boolean;
  disabled: boolean;
  loading = true;
  loadingButton = false;

  
  constructor(
    public dialogRef: MatDialogRef<EliminarCategoriaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private afs: AngularFirestore,
    private fb: FormBuilder
  ) { }

  ngOnInit() {

    this.categoriasFilter = this.data.categorias.filter( find => find !== this.data.categoria )

    // this.categoria = new FormControl('', [Validators.required]);

    this.formCategoria = this.fb.group({
      categoria: ['', Validators.required]
    });

    if (this.data.categoria.size >= 1) {
      this.enUso = true
    } else {
      this.enUso = false;
    }

    this.afs.collection(`negocios/${this.data.idNegocio}/items`, ref => ref
    .where('categoria', '==', this.data.categoria.nombre)
    ).valueChanges().subscribe( res => {

      this.itemsEnUso = res;
      console.log(this.itemsEnUso);

      // if (this.itemsEnUso.length >= 1) {
      //   this.loading = false
      //   this.enUso = true;
      // } else {
      //   this.loading = false
      //   this.enUso = false;
      // }
      
    });

  }

  onSubmit() {
    if (this.formCategoria.valid) {
      this.loading = true;
      this.updateAndDeleteCategoriaFirestore();
    } else {
      this.validateAllFormFields(this.formCategoria);
    }
  }

  
  updateAndDeleteCategoriaFirestore() {

    this.loadingButton = true;
    
    const promises = this.itemsEnUso.map( element => {
      return this.afs.doc(`negocios/${this.data.idNegocio}/items/${element.id}`).update({
        categoria: this.formCategoria.value.categoria
      }).then( () => {
        console.log(this.formCategoria.value.categoria);
      });
    });

    Promise.all(promises).then( response =>{
      console.log(response);
      this.deleteCategoriaFirestore();
    });
    
  }


  deleteCategoriaFirestore() {
    this.loadingButton = true;
    this.afs.collection(`negocios/${this.data.idNegocio}/categorias`).doc(this.data.categoria.id).delete().then( () => {
      this.cancelar();
    });
  }

  cancelar() {
    this.dialogRef.close();
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

 

}
