import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { EditorModule } from "@tinymce/tinymce-angular";

// Tabler icons
import { TablerIconsAngularModule } from '../tabler-icons-angular.module';

// Copy clipboard
import { ClipboardModule } from '@angular/cdk/clipboard';


import { UploadImagesComponent } from './upload-images/upload-images.component';
import { ListaItemsComponent } from '../components/admin/lista-items/lista-items.component';
import { CrearItemComponent } from '../components/admin/crear-item/crear-item.component';
import { DetalleNegocioComponent } from '../components/admin/detalle-negocio/detalle-negocio.component';
import { AdminRoutingModule } from './admin-routing.module';
import { HeaderAdminComponent } from '../components/admin/header-admin/header-admin.component';
import { AdminComponent } from '../components/admin/admin/admin.component';
import { EditarItemComponent } from '../components/admin/editar-item/editar-item.component';
import { EliminarCategoriaComponent } from './eliminar-categoria/eliminar-categoria.component';
import { EditarCategoriaComponent } from './editar-categoria/editar-categoria.component';
import { LogoNegocioComponent } from '../components/admin/logo-negocio/logo-negocio.component';
import { ConfiguracionComponent } from '../components/admin/configuracion/configuracion.component';
import { QrCodeComponent } from '../components/admin/qr-code/qr-code.component';
import { QRCodeModule } from 'angularx-qrcode';
import { ShareAdminComponent } from '../components/admin/share-admin/share-admin.component';
import { ConfigurarNegocioComponent } from '../components/admin/configurar-negocio/configurar-negocio.component';
import { AgregarRedesComponent } from '../components/admin/agregar-redes/agregar-redes.component';
import { MenuAdminComponent } from './menu-admin/menu-admin.component';
import { MejoraPlanComponent } from './mejora-plan/mejora-plan.component';
import { SelectPLanComponent } from '../components/admin/select-plan/select-plan.component';




@NgModule({
  declarations: [
    DetalleNegocioComponent,
    ListaItemsComponent,
    CrearItemComponent,
    EditarItemComponent,
    UploadImagesComponent,
    HeaderAdminComponent,
    AdminComponent,
    EliminarCategoriaComponent,
    EditarCategoriaComponent,
    ConfiguracionComponent,
    LogoNegocioComponent,
    QrCodeComponent,
    ShareAdminComponent,
    ConfigurarNegocioComponent,
    AgregarRedesComponent,
    MenuAdminComponent,
    MejoraPlanComponent,
    SelectPLanComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    TablerIconsAngularModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    // EditorModule,
    QRCodeModule,
    ClipboardModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AdminModule { }
