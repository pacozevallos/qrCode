import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatBottomSheet} from '@angular/material/bottom-sheet';
import { MatDialog as MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';
import { ShareComponent } from '../../public/share/share.component';
import { AdicionalesComponent } from '../adicionales/adicionales.component';
import { AgregarCelularComponent } from '../agregar-celular/agregar-celular.component';
import { AgregarRedesComponent } from '../agregar-redes/agregar-redes.component';
import { CrearItemComponent } from '../crear-item/crear-item.component';
import { DuplicarNegocioComponent } from '../duplicar-negocio/duplicar-negocio.component';
import { EditarNegocioComponent } from '../editar-negocio/editar-negocio.component';
import { EliminarNegocioComponent } from '../eliminar-negocio/eliminar-negocio.component';
import { LogoNegocioComponent } from '../logo-negocio/logo-negocio.component';
import { QrCodeComponent } from '../qr-code/qr-code.component';
import { VistaQrComponent } from '../vista-qr/vista-qr.component';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Negocio } from 'src/app/classes/negocio';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.scss']
})
export class ConfiguracionComponent implements OnInit {

  idNegocio: string;
  negocio;
  user;

  opciones = [
    // {
    //   nombre: 'Editar',
    //   icon: 'pencil',
    //   function: (negocio) => this.editarNegocio(negocio)
    // },
    // {
    //   nombre: 'WhatsApp',
    //   icon: 'brand-whatsApp',
    //   function: (negocio) => this.agregarWhatsApp(negocio)
    // },
    {
      nombre: 'Logotipo',
      icon: 'user-circle',
      function: (negocio) => this.agregarLogo(negocio)
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
    {
      nombre: 'Duplicar negocio',
      icon: 'copy',
      function: (negocio) => this.duplicarNegocio(negocio)
    },
    {
      nombre: 'Eliminar negocio',
      icon: 'trash',
      function: (negocio) => this.eliminarNegocio(negocio)
    },
  ];

  constructor(
    private activatedRoute: ActivatedRoute,
    private afs: AngularFirestore,
    private fs: FirebaseService,
    private bottomSheet: MatBottomSheet,
    private router: Router,
    private matDialog: MatDialog,
    private afAuth: AngularFireAuth
  ) { }

  ngOnInit(): void {

    // this.activatedRoute.parent.url.subscribe(res => {
    //   const url = res[0].path;
    //   console.log(url);
    // });

    // this.activatedRoute.parent.url.subscribe(params => {
    //   this.idNegocio = params[0].path;
    //   this.afs.doc('negocios/' + this.idNegocio).valueChanges().subscribe(res => {
    //     this.negocio = res;
    //   });
    // });

     // traer solo el negocio del usuario
    this.afAuth.authState.subscribe( user => {
      this.user = user;
      this.afs.collection('negocios').valueChanges().subscribe( res => {
        const negocioRef = res.find( (find: Negocio) => find.autorId === this.user.uid );
        this.negocio = negocioRef;
      });
    });

  }

  verItems(negocio) {
    this.router.navigate([`admin/${negocio.id}/productos`]);
  }

  agregarItem() {
    this.bottomSheet.open(CrearItemComponent, {
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

}
