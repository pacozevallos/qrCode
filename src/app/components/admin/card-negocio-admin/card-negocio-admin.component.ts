import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ShareComponent } from '../../public/share/share.component';
import { AdicionalesComponent } from '../adicionales/adicionales.component';
import { AgregarCelularComponent } from '../agregar-celular/agregar-celular.component';
import { AgregarRedesComponent } from '../agregar-redes/agregar-redes.component';
import { EditarNegocioComponent } from '../editar-negocio/editar-negocio.component';
import { EliminarNegocioComponent } from '../eliminar-negocio/eliminar-negocio.component';
import { LogoNegocioComponent } from '../logo-negocio/logo-negocio.component';
import { VistaQrComponent } from '../vista-qr/vista-qr.component';

@Component({
  selector: 'app-card-negocio-admin',
  templateUrl: './card-negocio-admin.component.html',
  styleUrls: ['./card-negocio-admin.component.scss']
})
export class CardNegocioAdminComponent implements OnInit {

  @Input() negocio

  opciones = [
    {
      nombre: 'Agregar productos',
      icon: 'list-details',
      function: (negocio) => this.verItems(negocio)
    },
    // {
    //   nombre: 'Agregar whatsApp',
    //   icon: 'brand-whatsApp',
    //   function: (negocio) => this.agregarWhatsApp(negocio)
    // },
    {
      nombre: 'Agregar logo',
      icon: 'plus',
      function: (negocio) => this.agregarLogo(negocio)
    },
    {
      nombre: 'Ver código QR',
      icon: 'qrcode',
      function: (negocio) => this.verCodigoQr(negocio)
    },
    {
      nombre: 'Compartir link',
      icon: 'link',
      function: (negocio) => this.compartirNegocio(negocio)
    },
    {
      nombre: 'Agregar redes sociales',
      icon: 'share',
      function: (negocio) => this.agregarRedes(negocio)
    },
    {
      nombre: 'Editar negocio',
      icon: 'pencil',
      function: (negocio) => this.editarNegocio(negocio)
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
    }
  ];

  items = [];


  constructor(
    private matDialog: MatDialog,
    private router: Router,
    private bottomSheet: MatBottomSheet,
    private afs: AngularFirestore
  ) { }

  ngOnInit(): void {
    console.log(this.negocio);

    this.afs.collection('negocios').doc(this.negocio.id).collection('items').valueChanges().subscribe( res => {
      this.items = res;
    });
    
  }

  verItems(negocio) {
    this.router.navigate(['admin/' + negocio.id]);
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
      // panelClass: 'myBottomSheetFull',
      data: negocio
    });
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

  eliminarNegocio(negocio) {
    this.matDialog.open(EliminarNegocioComponent, {
      data: negocio
    });
  }

  agregarWhatsApp(negocio) {
    this.bottomSheet.open(AgregarCelularComponent, {
      data: negocio
    });
  }

}
