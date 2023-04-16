import { ChangeDetectorRef, Component, Inject, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { DomSanitizer } from '@angular/platform-browser';
import { IconLoader } from 'angular-tabler-icons/icons';
// import { FileValidator } from 'ngx-material-file-input';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { Negocio } from 'src/app/classes/negocio';

@Component({
  selector: 'app-logo-negocio',
  templateUrl: './logo-negocio.component.html',
  styleUrls: ['./logo-negocio.component.scss']
})
export class LogoNegocioComponent implements OnInit {

  @Input() negocio: Negocio;

  formLogoNegocio: FormGroup;
  loader = false;


  selectedFile: FileList | null;
  nameItem: any;
  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;
  readonly maxSize = 1048576 * 5;
  actualSize: any;

  loadingLogo = true;

  fileImgUrl: any;

  // imageLogo = new FormControl('', [FileValidator.maxContentSize(this.maxSize)])

  constructor(
    private fb: FormBuilder,
    private storage: AngularFireStorage,
    // private bottomSheetRef: MatBottomSheetRef<LogoNegocioComponent>,
    // @Inject(MAT_BOTTOM_SHEET_DATA) public data: Negocio,
    private afs: AngularFirestore,
  ) { }

  ngOnInit(): void {

    console.log(this.negocio);
    

    this.formLogoNegocio = this.fb.group({
      imageLogo: ['', [ Validators.required]]
    });

  }

  // onSubmit() {
  //   if (this.formLogoNegocio.valid) {
  //     this.loader = true;
  //     this.uploadLogoNegocio();
  //   } else {
  //     this.validateAllFormFields(this.formLogoNegocio);
  //   }
  // }

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


  getFileDetail (event: any) {

    const file = event.target.files[0];
    this.fileImgUrl = URL.createObjectURL(file);

    console.log(file);
    this.loader = true;
    this.uploadLogoNegocio(file);

  }


  detectFiles(event) {
    this.selectedFile = event.target.files[0];
    this.nameItem = event.target.files[0].name;
    console.log(this.nameItem);
  }

  uploadLogoNegocio(file: File) {
    const nombreImage = file.name.split('.');

    // const file = this.selectedFile;
    const filePath = `imagesLogosNegocios/${this.negocio.id}.${nombreImage[1]}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);

    this.uploadPercent = task.percentageChanges();
    task.snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().toPromise().then( (url) => {

          this.afs.collection('negocios').doc(this.negocio.id).update({
            imageLogo: url,
            imageLogoName: `${this.negocio.id}.${nombreImage[1]}`
          });

          this.loader = true;
          console.log(url);

        }).catch(err => { console.log(err); } );
      })
    )
    .subscribe();
  }

  detectarCargado() {
    this.loadingLogo = false;
  }

  // cancelar() {
  //   this.bottomSheetRef.dismiss();
  // }

  // errorImagen() {
  //   return this.formLogoNegocio.controls.imageLogo.hasError('maxContentSize') ? 'El peso no debe exceder los 5 MB' : '';
  // }

}
