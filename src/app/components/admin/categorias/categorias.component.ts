import { Component, Input, OnInit } from '@angular/core';
import { Negocio } from '../../../classes/negocio';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatTableDataSource } from '@angular/material/table';

import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { CrearCategoriaItemComponent } from '../crear-categoria-item/crear-categoria-item.component';
import { EliminarCategoriaComponent } from 'src/app/admin/eliminar-categoria/eliminar-categoria.component';
import { EditarCategoriaComponent } from 'src/app/admin/editar-categoria/editar-categoria.component';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { map } from 'rxjs/operators';
import { Categoria } from 'src/app/classes/categoria';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.scss']
})
export class CategoriasComponent implements OnInit {

  // @Input() negocio: Negocio;
  negocio: Negocio;
  formCategorias: FormGroup;
  loading: boolean;
  categorias: Categoria[] = [];
  categoriasNew = [];
  sizeCategoria = 0;


  displayedColumns = [ 'changeOrder', 'nombre', 'editar', 'eliminar'];
  // categorias = new MatTableDataSource();

  constructor(
    private afs: AngularFirestore,
    private fb: FormBuilder,
    private matDialog: MatDialog,
    private afAuth: AngularFireAuth
  ) { }

  ngOnInit(): void {

    this.afAuth.authState.subscribe( res => {
      const user = res;
      this.afs.collection('negocios').valueChanges().subscribe( (res: any) => {

        this.negocio = res.find( (find: Negocio) => find.autorId === user.uid );

        this.afs.collection(`negocios/${this.negocio.id}/categorias`, ref => ref
        .orderBy('order', 'asc')
        ).valueChanges().subscribe( (data: any) => {

          const loopCategoria = data.map( element => {
            return this.getSizeCategoria(element);
          });

          Promise.all(loopCategoria).then( response => {
            console.log(response);
            this.categorias = response;
          })

        });


      });
    });


  }

  getSizeCategoria(element) {

    return this.afs.collection(`negocios/${this.negocio.id}/items`, ref => ref
    .where('categoria', '==', element.nombre)
    ).get().toPromise().then( res => {
      console.log(res.size);
      const size = res.size;
      return { ...element, size };
    });

  }


  drop(event: CdkDragDrop<any[]>) {
    moveItemInArray(this.categorias, event.previousIndex, event.currentIndex);

    this.categorias.map( (element: any, index: number )=> {
      this.afs.collection(`negocios/${this.negocio.id}/categorias`).doc(element.id).update({
        order: index + 1
      });
    });

  }

  onSubmit() {
    if (this.formCategorias.valid) {
      this.loading = true;
      this.updateCategorias();
    } else {
      this.validateAllFormFields(this.formCategorias);
    }
  }

  updateCategorias() {
    this.afs.doc('negocios/' + this.negocio.id).update(this.formCategorias.value)
    .then(() => {
      this.loading = false;
      console.log('Categorías actualizadas');
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

  agregarCategoria() {
    (this.formCategorias.controls.categorias as FormArray).push(
      this.fb.control('', Validators.required)
    );
  }

  eliminarCategoria(index: number): void {
    (this.formCategorias.controls.categorias as FormArray).removeAt(index);
  }

  openModalAddCategoria() {
    this.matDialog.open(CrearCategoriaItemComponent, {
      autoFocus: false,
      data: {
        idNegocio: this.negocio.id,
      }
    })
  }


  openModalEditCategoria(categoria) {
    this.matDialog.open( EditarCategoriaComponent, {
      panelClass: 'dialogSmall',
      data: {
        idNegocio: this.negocio.id,
        categoria: categoria,
        categorias: this.categorias
      }
    })
  }

  openModalDeleteCategoria(categoria) {
    this.matDialog.open( EliminarCategoriaComponent, {
      panelClass: 'dialogSmall',
      data: {
        idNegocio: this.negocio.id,
        categoria: categoria,
        categorias: this.categorias
      }
    })
  }

}
