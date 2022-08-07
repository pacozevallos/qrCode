import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { ActivatedRoute, Router } from '@angular/router';
import { Negocio } from 'src/app/classes/negocio';
import { FirebaseService } from 'src/app/services/firebase.service';
import { CrearItemComponent } from '../crear-item/crear-item.component';
import { map } from 'rxjs/operators';
import { EditarItemComponent } from '../editar-item/editar-item.component';
import { EditarNegocioComponent } from '../editar-negocio/editar-negocio.component';
import { VistaQrComponent } from '../vista-qr/vista-qr.component';
import { AdicionalesComponent } from '../adicionales/adicionales.component';
import { LogoNegocioComponent } from '../logo-negocio/logo-negocio.component';
import { MatDialog } from '@angular/material/dialog';
import { ShareComponent } from '../../public/share/share.component';
import { AgregarRedesComponent } from '../agregar-redes/agregar-redes.component';
import { EliminarNegocioComponent } from '../eliminar-negocio/eliminar-negocio.component';
import { AgregarCelularComponent } from '../agregar-celular/agregar-celular.component';
import { DuplicarNegocioComponent } from '../duplicar-negocio/duplicar-negocio.component';
import { QrCodeComponent } from '../qr-code/qr-code.component';

@Component({
  selector: 'app-detalle-negocio',
  templateUrl: './detalle-negocio.component.html',
  styleUrls: ['./detalle-negocio.component.scss']
})
export class DetalleNegocioComponent implements OnInit {

  idNegocio: string;
  negocio;
  // opciones = [
  //   {
  //     nombre: 'Compartir negocio',
  //     icon: 'share',
  //     function: () => this.verCodigoQr()
  //   },
  //   {
  //     nombre: 'Agregar reglas',
  //     icon: 'adjustments',
  //     function: () => this.adicionales()
  //   },
  //   {
  //     nombre: 'Agregar item',
  //     icon: 'plus',
  //     function: () => this.agregarItem()
  //   }
  // ];

  opciones = [
    // {
    //   nombre: 'Agregar producto',
    //   icon: 'plus',
    //   function: () => this.agregarItem()
    // },
    {
      nombre: 'Productos',
      icon: 'list-details',
      function: (negocio) => this.verItems(negocio)
    },
    {
      nombre: 'Editar',
      icon: 'pencil',
      function: (negocio) => this.editarNegocio(negocio)
    },
    {
      nombre: 'WhatsApp',
      icon: 'brand-whatsApp',
      function: (negocio) => this.agregarWhatsApp(negocio)
    },
    {
      nombre: 'Logotipo',
      icon: 'user-circle',
      function: (negocio) => this.agregarLogo(negocio)
    },
    {
      nombre: 'Código QR',
      icon: 'qrcode',
      function: (negocio) => this.verCodigoQr(negocio)
    },
    {
      nombre: 'Código QR',
      icon: 'qrcode',
      function: (negocio) => this.crearCodigoQr(negocio)
    },
    {
      nombre: 'Compartir link',
      icon: 'share',
      function: (negocio) => this.compartirNegocio(negocio)
    },
    {
      nombre: 'Redes sociales',
      icon: 'brand-facebook',
      function: (negocio) => this.agregarRedes(negocio)
    },

    // {
    //   nombre: 'Agregar condiciones',
    //   icon: 'settings',
    //   function: (negocio) => this.otrasConfiguraciones(negocio)
    // },

    {
      nombre: 'Eliminar negocio',
      icon: 'trash',
      function: (negocio) => this.eliminarNegocio(negocio)
    },
    {
      nombre: 'Duplicar negocio',
      icon: 'copy',
      function: (negocio) => this.duplicarNegocio(negocio)
    }
  ];

  constructor(
    private activatedRoute: ActivatedRoute,
    private afs: AngularFirestore,
    private fs: FirebaseService,
    private bottomSheet: MatBottomSheet,
    private bottomSheetRef: MatBottomSheetRef,
    private router: Router,
    private matDialog: MatDialog,

  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.idNegocio = params.id;


      // traer los datos del negocio
      this.afs.doc('negocios/' + this.idNegocio).valueChanges().subscribe(res => {
        this.negocio = res;
      });

      // this.bottomSheetRef.containerInstance._animationStateChanged = this.negocio;

    });
  }

  // verCodigoQr() {
  //   this.bottomSheet.open(VistaQrComponent, {
  //     // panelClass: 'myBottomSheetFull',
  //     data: this.negocio
  //   });
  // }

  // editarNegocio() {
  //   this.bottomSheet.open(EditarNegocioComponent, {
  //     // panelClass: 'myBottomSheetFull',
  //     data: this.negocio
  //   });
  // }

  // agregarItem() {
  //   this.bottomSheet.open(CrearItemComponent, {
  //     // panelClass: 'myBottomSheetFull',
  //     data: this.negocio
  //   });
  // }

  // adicionales() {
  //   this.bottomSheet.open(AdicionalesComponent, {
  //     data: this.negocio
  //   });
  // }






  verItems(negocio) {
    this.router.navigate([`admin/${negocio.id}/productos`]);
  }

  agregarItem() {
    this.bottomSheet.open(CrearItemComponent, {
      // panelClass: 'myBottomSheetFull',
      data: this.negocio
    });
  }


  editarNegocio(negocio) {
    this.bottomSheet.open(EditarNegocioComponent, {
      data: negocio
    });
  }

  agregarLogo(negocio) {
    this.bottomSheet.open(LogoNegocioComponent, {
      data: negocio
    });
  }

  compartirNegocio(negocio) {
    this.matDialog.open(ShareComponent, {
      data: {
        negocio: this.negocio
      }
    });
  }

  verCodigoQr(negocio) {
    this.bottomSheet.open(VistaQrComponent, {
      data: negocio
    });
  }

  crearCodigoQr(negocio) {
    this.bottomSheet.open(QrCodeComponent, {
      data: negocio
    })
  }

  agregarRedes(negocio) {
    this.bottomSheet.open(AgregarRedesComponent, {
      data: negocio
    });
  }

  otrasConfiguraciones(negocio) {
    this.bottomSheet.open(AdicionalesComponent, {
      data: negocio
    });
  }

  agregarWhatsApp(negocio) {
    this.bottomSheet.open(AgregarCelularComponent, {
      data: negocio
    });
  }

  eliminarNegocio(negocio) {
    this.matDialog.open(EliminarNegocioComponent, {
      panelClass: 'dialogSmall',
      data: negocio
    });
  }

  duplicarNegocio(negocio) {
    this.matDialog.open(DuplicarNegocioComponent, {
      panelClass: 'dialogSmall',
      data: negocio
    });
  }

  // duplicarNegocio(negocio) {
  //   return this.afs.collection('negocios').doc('yahis-fofuras').set(negocio)
  //     .then(() => {
  //       console.log('negocio copiado');
  //       this.afs.collection('negocios').doc(this.idNegocio).collection('items').valueChanges().subscribe(data => {
  //         const items = data;
  //         items.forEach(item => {
  //           return this.afs.collection('negocios').doc('yahis-fofuras').collection('items').doc().set(item)
  //             .then(() => {
  //               console.log('items copiados');
  //             });
  //         });
  //       });
  //     });
  // }


}
