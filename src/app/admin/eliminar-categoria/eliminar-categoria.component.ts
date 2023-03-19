import { Component, Inject, inject } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-eliminar-categoria',
  templateUrl: './eliminar-categoria.component.html',
  styleUrls: ['./eliminar-categoria.component.scss']
})
export class EliminarCategoriaComponent {

  categoria: FormControl;
  categorias = [];
  itemsEnUso = [];
  enUso: boolean;
  disabled: boolean;

  constructor(
    public dialogRef: MatDialogRef<EliminarCategoriaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private afs: AngularFirestore
  ) { }

  ngOnInit() {

    this.categorias = this.data.categorias;
    console.log(this.categorias);
    

    this.categoria = new FormControl('', [Validators.required]);

    if ( this.categoria.value === this.data.categoria.nombre ) {
      this.disabled = false;
    } else {
      this.disabled = true;
    }

    this.afs.collection(`negocios/${this.data.idNegocio}/items`, ref => ref
    .where('categoria', '==', this.data.categoria.nombre)
    ).valueChanges().subscribe( res => {

      this.itemsEnUso = res;
      console.log(res);

      if (this.itemsEnUso.length >= 1) {
        this.enUso = true;
      } else {
        this.enUso = false;
      }
      
    });



  }

  
  cambiarCategoria() {
    console.log('listo para cambiar');
    
  }

  cancelar() {
    this.dialogRef.close();
  }

}
