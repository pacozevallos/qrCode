import { Component, Input, OnInit } from '@angular/core';
import { Negocio } from '../../../classes/negocio';
import { UntypedFormGroup, UntypedFormBuilder, Validators, UntypedFormArray, UntypedFormControl } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.scss']
})
export class CategoriasComponent implements OnInit {

  @Input() negocio: Negocio;
  formCategorias: UntypedFormGroup;
  loading: boolean;
  categorias = [];

  constructor(
    private afs: AngularFirestore,
    private fb: UntypedFormBuilder
  ) { }

  ngOnInit(): void {

    console.log(this.negocio);


    this.formCategorias = this.fb.group({
      categorias: this.fb.array([])
      // categorias: this.negocio.categorias
    });

    const arrayCategorias = this.formCategorias.controls.categorias as UntypedFormArray;

    if (this.negocio.categorias?.length === 0) {
      arrayCategorias.push(
        // this.fb.group({
        //   nombre: ['', Validators.required],
        //   url: ['', Validators.required],
        //   icon: ['']
        // })
        this.fb.control('', Validators.required)
      );
    }

    if (this.negocio.categorias?.length >= 1 ) {
      this.negocio.categorias.forEach( element => {
        arrayCategorias.push(
          // this.fb.group({
          //   nombre: [element.nombre, Validators.required],
          //   url: [element.url, Validators.required],
          //   icon: [element.icon]
          // })
          // this.fb.control(element, Validators.required)
          this.fb.control(element, Validators.required)
        );
      });
    }

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

  validateAllFormFields(formGroup: UntypedFormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof UntypedFormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof UntypedFormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  agregarCategoria() {
    (this.formCategorias.controls.categorias as UntypedFormArray).push(
      this.fb.control('', Validators.required)
    );
  }

  eliminarCategoria(index: number): void {
    (this.formCategorias.controls.categorias as UntypedFormArray).removeAt(index);
  }

}
