import { Component, Inject, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Negocio } from 'src/app/classes/negocio';
import { DataService } from 'src/app/services/data.service';
import { ColorComponent } from '../../public/color/color.component';

@Component({
  selector: 'app-editar-negocio',
  templateUrl: './editar-negocio.component.html',
  styleUrls: ['./editar-negocio.component.scss']
})
export class EditarNegocioComponent implements OnInit {

  formNegocio: FormGroup;
  loading = false;
  color: string;
  redesSociales = [];
  tiposNegocio = [];
  filteredOptions: Observable<string[]>;

  constructor(
    private bottomSheetRef: MatBottomSheetRef<EditarNegocioComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: Negocio,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private afs: AngularFirestore,
    private ds: DataService
  ) { }

  ngOnInit(): void {

    this.redesSociales = this.ds.redesSociales;
    this.tiposNegocio = this.ds.tiposNegocio;
    this.color = this.data.color;

    this.formNegocio = this.fb.group({
      nombre: [this.data.nombre, Validators.required],

      // numeroWhatsApp: [this.data.numeroWhatsApp, [Validators.pattern('[0-9]*'), Validators.minLength(9), Validators.maxLength(9)]],
      // tipo: [this.data.tipo],
      // direccion: [this.data.direccion],
      // categorias: [this.data.categorias],

      color: [ this.data.color, Validators.required],
      fechaEdicion: [firebase.default.firestore.Timestamp.fromDate(new Date())]
    });

    // this.formNegocio.addControl('redes', this.fb.array([]));

    // this.data.redes.forEach( element => {
    //   const arrayRedes = this.formNegocio.controls.redes as FormArray;
    //   arrayRedes.push(
    //     this.fb.group({
    //       nombre: [element.nombre],
    //       url: [element.url],
    //       icon: [element.icon]
    //     })
    //   );
    // });


    // this.formNegocio.controls.redes.valueChanges.subscribe( redes => {
    //   const control = this.formNegocio.controls.redes as FormArray;
    //   for (const i in redes) {
    //     control.at(+i).get('nombre').valueChanges.subscribe( res => {
    //       const red = this.ds.redesSociales.find( find => find.nombre === res);
    //       control.at(+i).get('icon').setValue(red.icon);
    //     });
    //   }
    // });


    // this.filteredOptions = this.formNegocio.get('tipo').valueChanges
    //   .pipe(
    //     startWith(''),
    //     map(value => this.filter(value))
    //   );

  }

  private filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.tiposNegocio.filter(option => option.toLowerCase().includes(filterValue));
  }

  onSubmit() {
    if (this.formNegocio.valid) {
      this.loading = true;
      this.guardarCambios();
      // this.uploadQrCodeAndCrearNegocio();
    } else {
      this.validateAllFormFields(this.formNegocio);
    }
  }

  guardarCambios() {
    this.afs.doc('negocios/' + this.data.id).update(this.formNegocio.value)
    .then(() => {
      this.bottomSheetRef.dismiss();
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
    (this.formNegocio.controls.redes as FormArray).push(
      this.fb.group({
        nombre: [''],
        url: [''],
        icon: ['']
      })
    );
  }

  eliminarRed(index: number): void {
    (this.formNegocio.controls.redes as FormArray).removeAt(index);
  }

  
  openModalCrearColor() {
    const dialogRef = this.dialog.open(ColorComponent, {
      panelClass: 'dialogColor',
      data: this.data.color,
      // disableClose: true
    });
    dialogRef.afterClosed().subscribe( result => {
      console.log(result);
      if ( result !== undefined) {
        this.color = result;
        this.formNegocio.get('color').setValue(this.color);
      }
    });
    // dialogRef.componentInstance.color.subscribe( res => {
    //   console.log(res);
    //   this.color = res;
    //   this.formNegocio.get('color').setValue(this.color);
    // })
  }

  cancelar() {
    this.bottomSheetRef.dismiss();
  }


  errorNombreNegocio() {
    return this.formNegocio.controls.nombre.hasError('required') ? 'Ingresa un nombre' : '';
  }

  errorWhatsApp() {
    return this.formNegocio.controls.numeroWhatsApp.hasError('required') ? 'Ingresa un número' :
    this.formNegocio.controls.numeroWhatsApp.hasError('pattern') ? 'Solo se admiten números.' :
    this.formNegocio.controls.numeroWhatsApp.hasError('minlength') ? 'Mínimo 9 caracteres' :
    this.formNegocio.controls.numeroWhatsApp.hasError('maxlength') ? 'No debe exceder 9 caracteres' : '';
  }

}
