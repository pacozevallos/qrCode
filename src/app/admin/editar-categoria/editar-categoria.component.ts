import { Component, Inject } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-editar-categoria',
  templateUrl: './editar-categoria.component.html',
  styleUrls: ['./editar-categoria.component.scss']
})
export class EditarCategoriaComponent {

  formCategoria: FormGroup;
  loading = false;
  itemsEnUso = [];

  constructor(
    public dialogRef: MatDialogRef<EditarCategoriaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private afs: AngularFirestore,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {}
 
  ngOnInit() {

    this.formCategoria = this.fb.group({
      categoria: [this.data.categoria.nombre, Validators.required]
    });

    this.afs.collection(`negocios/${this.data.idNegocio}/items`, ref => ref
    .where('categoria', '==', this.data.categoria.nombre)
    ).valueChanges().subscribe( res => {
      this.itemsEnUso = res;
      console.log(this.itemsEnUso);
    });

  }

  onSubmit() {

    if (this.formCategoria.valid) {
      this.loading = true;
      this.updateCategoriaItems();
      
    } else {
      this.validateAllFormFields(this.formCategoria);
    }

  }

  updateCategoriaItems() {

    const promises = this.itemsEnUso.map( element => {
      return this.afs.doc(`negocios/${this.data.idNegocio}/items/${element.id}`).update({
        categoria: this.formCategoria.value.categoria
      }).then( (res) => {
        return this.formCategoria.value.categoria
      });
    });

    Promise.all(promises).then( response =>{
      console.log(response);
      this.updateCategoriaCollection();
    });
    
  }


  updateCategoriaCollection() {

    this.afs.doc(`negocios/${this.data.idNegocio}/categorias/${this.data.categoria.id}`).update({
      nombre: this.formCategoria.value.categoria
    }).then( () => {
      'Categoría editada';
      this.snackBar.open('Cambios guardados', 'CERRAR', {
        duration: 5000
      });
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
