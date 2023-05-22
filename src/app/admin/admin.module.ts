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
import { ActualizarDatosComponent } from '../components/admin/actualizar-datos/actualizar-datos.component';
import { AdicionalesComponent } from '../components/admin/adicionales/adicionales.component';
import { AgregarCelularComponent } from '../components/admin/agregar-celular/agregar-celular.component';
import { AgregarNegocioComponent } from '../components/admin/agregar-negocio/agregar-negocio.component';
import { CambiarPLanComponent } from '../components/admin/cambiar-plan/cambiar-plan.component';
import { CardItemAdminComponent } from '../components/admin/card-item-admin/card-item-admin.component';
import { CardNegocioAdminComponent } from '../components/admin/card-negocio-admin/card-negocio-admin.component';
import { CategoriasComponent } from '../components/admin/categorias/categorias.component';
import { ContraseniaComponent } from '../components/admin/contrasenia/contrasenia.component';
import { CrearCategoriaItemComponent } from '../components/admin/crear-categoria-item/crear-categoria-item.component';
import { CuentaComponent } from '../components/admin/cuenta/cuenta.component';
import { DetalleItemAdminComponent } from '../components/admin/detalle-item-admin/detalle-item-admin.component';
import { DuplicarNegocioComponent } from '../components/admin/duplicar-negocio/duplicar-negocio.component';
import { EditarNegocioComponent } from '../components/admin/editar-negocio/editar-negocio.component';
import { EliminarItemComponent } from '../components/admin/eliminar-item/eliminar-item.component';
import { EliminarNegocioComponent } from '../components/admin/eliminar-negocio/eliminar-negocio.component';
import { FooterAdminComponent } from '../components/admin/footer-admin/footer-admin.component';
import { GraciasPlanPowerComponent } from '../components/admin/gracias-plan-power/gracias-plan-power.component';
import { GraciasPlanComponent } from '../components/admin/gracias-plan/gracias-plan.component';
import { ListaNegociosComponent } from '../components/admin/lista-negocios/lista-negocios.component';
import { PagoExitoPLanAnualComponent } from '../components/admin/pago-exito-plan-anual/pago-exito-plan-anual.component';
import { PagoExitoPLanMensualComponent } from '../components/admin/pago-exito-plan-mensual/pago-exito-plan-mensual.component';
import { PlanComponent } from '../components/admin/plan/plan.component';
import { UpgradeComponent } from '../components/admin/upgrade/upgrade.component';
import { VistaQrComponent } from '../components/admin/vista-qr/vista-qr.component';
import { ColorComponent } from '../components/public/color/color.component';
import { CompartirItemComponent } from '../components/public/compartir-item/compartir-item.component';
import { CompartirNegocioComponent } from '../components/public/compartir-negocio/compartir-negocio.component';
import { ContentNegocioComponent } from '../components/public/content-negocio/content-negocio.component';
import { ContraseniaGraciasComponent } from '../components/public/contrasenia-gracias/contrasenia-gracias.component';
import { DestacadosNegocioComponent } from '../components/public/destacados-negocio/destacados-negocio.component';
import { FooterNegocioComponent } from '../components/public/footer-negocio/footer-negocio.component';
import { HeaderNegocioComponent } from '../components/public/header-negocio/header-negocio.component';
import { ItemsNegocioComponent } from '../components/public/items-negocio/items-negocio.component';
import { SafePipe } from '../pipes/safe.pipe';
import { CloseDialogComponent } from './close-dialog/close-dialog.component';
import { LoadingComponent } from './loading/loading.component';




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
    SelectPLanComponent,

    ListaNegociosComponent,
		AgregarNegocioComponent,
		CrearCategoriaItemComponent,
		EliminarItemComponent,
		CardItemAdminComponent,
		ColorComponent,
		EditarNegocioComponent,
		VistaQrComponent,
		DetalleItemAdminComponent,
		EliminarNegocioComponent,
		AdicionalesComponent,
		UpgradeComponent,
		CardNegocioAdminComponent,
		CuentaComponent,
		PlanComponent,
		ContraseniaComponent,
		ActualizarDatosComponent,
		AgregarCelularComponent,
		HeaderNegocioComponent,
		ContentNegocioComponent,
		ItemsNegocioComponent,
		FooterNegocioComponent,
		CompartirNegocioComponent,
		CompartirItemComponent,
		GraciasPlanPowerComponent,
		GraciasPlanComponent,
		ContraseniaGraciasComponent,
		PagoExitoPLanMensualComponent,
		PagoExitoPLanAnualComponent,
		CambiarPLanComponent,
		DuplicarNegocioComponent,
		CategoriasComponent,
		FooterAdminComponent,
  CloseDialogComponent,
  LoadingComponent,
    
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
