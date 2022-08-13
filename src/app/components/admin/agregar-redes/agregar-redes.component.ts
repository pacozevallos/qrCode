import { Component, Inject, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { Negocio } from 'src/app/classes/negocio';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-agregar-redes',
  templateUrl: './agregar-redes.component.html',
  styleUrls: ['./agregar-redes.component.scss']
})
export class AgregarRedesComponent implements OnInit {

  @Input() negocio: Negocio;

  formRedes: FormGroup;
  loading: boolean;
  redesSociales = [];

  constructor(
    // private bottomSheetRef: MatBottomSheetRef<AgregarRedesComponent>,
    // @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    private fb: FormBuilder,
    private afs: AngularFirestore,
    private ds: DataService
  ) { }

  ngOnInit(): void {

    this.redesSociales = this.ds.redesSociales;

    this.formRedes = this.fb.group({
      redes: this.fb.array([]),
    });

    const arrayRedes = this.formRedes.controls.redes as FormArray;
    if (this.negocio.redes?.length === 0) {
      arrayRedes.push(
        this.fb.group({
          nombre: ['', Validators.required],
          url: ['', Validators.required],
          icon: ['']
        })
      );
    }
    if (this.negocio.redes?.length >= 1 ) {
      this.negocio.redes.forEach( element => {
        arrayRedes.push(
          this.fb.group({
            nombre: [element.nombre, Validators.required],
            url: [element.url, Validators.required],
            icon: [element.icon]
          })
        );
      });
    }


    this.formRedes.controls.redes.valueChanges.subscribe( redes => {
      const control = this.formRedes.controls.redes as FormArray;
      for (const i in redes) {
        control.at(+i).get('nombre').valueChanges.subscribe( res => {
          const red = this.ds.redesSociales.find( find => find.nombre === res);
          control.at(+i).get('icon').setValue(red.icon);
        });
      }
    });



  }

  onSubmit() {
    if (this.formRedes.valid) {
      this.loading = true;
      this.updateNegocio();
    } else {
      this.validateAllFormFields(this.formRedes);
    }
  }

  updateNegocio() {
    this.afs.doc('negocios/' + this.negocio.id).update(this.formRedes.value)
    .then(() => {
      // this.bottomSheetRef.dismiss();
      this.loading = false;
      console.log('Redes sociales actualizada');
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

  agregarRed() {
    (this.formRedes.controls.redes as FormArray).push(
      this.fb.group({
        nombre: ['', Validators.required],
        url: ['', Validators.required],
        icon: ['']
      })
    );
  }

  eliminarRed(index: number): void {
    (this.formRedes.controls.redes as FormArray).removeAt(index);
  }

  // cancelar() {
  //   this.bottomSheetRef.dismiss();
  // }

}
