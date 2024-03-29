import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DragDropModule } from '@angular/cdk/drag-drop';


// Material
import { MaterialModule } from './material.module';


// Tabler icons
import { TablerIconsAngularModule } from './tabler-icons-angular.module';

// Angularfire2
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAnalytics, getAnalytics, ScreenTrackingService, UserTrackingService } from '@angular/fire/analytics';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideFunctions, getFunctions } from '@angular/fire/functions';
import { provideMessaging, getMessaging } from '@angular/fire/messaging';
import { providePerformance, getPerformance } from '@angular/fire/performance';
import { provideRemoteConfig, getRemoteConfig } from '@angular/fire/remote-config';
import { provideStorage, getStorage } from '@angular/fire/storage';
import { AngularFireModule, FIREBASE_OPTIONS } from '@angular/fire/compat';


// Español Angular
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
registerLocaleData(localeEs, 'es-ES');

import { QRCodeModule } from 'angularx-qrcode';

import { ClipboardModule } from '@angular/cdk/clipboard';

import { ColorSketchModule } from 'ngx-color/sketch';
import { ColorChromeModule } from 'ngx-color/chrome';


import { EditorModule } from "@tinymce/tinymce-angular";

import { SwiperModule } from 'swiper/angular';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PublicComponent } from './components/public/public/public.component';
import { HeaderComponent } from './components/public/header/header.component';
import { FooterComponent } from './components/public/footer/footer.component';
import { InicioComponent } from './components/public/inicio/inicio.component';
import { AdminComponent } from './components/admin/admin/admin.component';
import { HeaderAdminComponent } from './components/admin/header-admin/header-admin.component';
import { InicioAdminComponent } from './components/admin/inicio-admin/inicio-admin.component';
import { LoginComponent } from './components/public/login/login.component';
import { CrearItemComponent } from './components/admin/crear-item/crear-item.component';
import { ListaNegociosComponent } from './components/admin/lista-negocios/lista-negocios.component';
import { AgregarNegocioComponent } from './components/admin/agregar-negocio/agregar-negocio.component';
import { DetalleNegocioComponent } from './components/admin/detalle-negocio/detalle-negocio.component';
import { ListaItemsComponent } from './components/admin/lista-items/lista-items.component';
import { CrearCategoriaItemComponent } from './components/admin/crear-categoria-item/crear-categoria-item.component';
import { EliminarItemComponent } from './components/admin/eliminar-item/eliminar-item.component';
import { NegocioComponent } from './components/public/negocio/negocio.component';
import { CardItemComponent } from './components/public/card-item/card-item.component';
import { CardItemDestacadoComponent } from './components/public/card-item-destacado/card-item-destacado.component';
import { DetalleItemComponent } from './components/public/detalle-item/detalle-item.component';
// import { EditarItemComponent } from './components/admin/editar-item/editar-item.component';
import { ShareComponent } from './components/public/share/share.component';
import { CardItemAdminComponent } from './components/admin/card-item-admin/card-item-admin.component';
import { RegistroComponent } from './components/public/registro/registro.component';
import { ColorComponent } from './components/public/color/color.component';
import { EditarNegocioComponent } from './components/admin/editar-negocio/editar-negocio.component';
import { VistaQrComponent } from './components/admin/vista-qr/vista-qr.component';
import { DetalleItemAdminComponent } from './components/admin/detalle-item-admin/detalle-item-admin.component';
import { EliminarNegocioComponent } from './components/admin/eliminar-negocio/eliminar-negocio.component';
import { AdicionalesComponent } from './components/admin/adicionales/adicionales.component';
import { AgregarRedesComponent } from './components/admin/agregar-redes/agregar-redes.component';
import { UpgradeComponent } from './components/admin/upgrade/upgrade.component';
// import { LogoNegocioComponent } from './components/admin/logo-negocio/logo-negocio.component';
import { CardNegocioAdminComponent } from './components/admin/card-negocio-admin/card-negocio-admin.component';
import { CuentaComponent } from './components/admin/cuenta/cuenta.component';
import { PlanComponent } from './components/admin/plan/plan.component';
import { ContraseniaComponent } from './components/admin/contrasenia/contrasenia.component';
import { ActualizarDatosComponent } from './components/admin/actualizar-datos/actualizar-datos.component';
import { SelectPLanComponent } from './components/admin/select-plan/select-plan.component';
import { AgregarCelularComponent } from './components/admin/agregar-celular/agregar-celular.component';
import { HeaderNegocioComponent } from './components/public/header-negocio/header-negocio.component';
import { ContentNegocioComponent } from './components/public/content-negocio/content-negocio.component';
import { DestacadosNegocioComponent } from './components/public/destacados-negocio/destacados-negocio.component';
import { ItemsNegocioComponent } from './components/public/items-negocio/items-negocio.component';
import { FooterNegocioComponent } from './components/public/footer-negocio/footer-negocio.component';
import { CompartirNegocioComponent } from './components/public/compartir-negocio/compartir-negocio.component';
import { CompartirItemComponent } from './components/public/compartir-item/compartir-item.component';
import { GraciasPlanPowerComponent } from './components/admin/gracias-plan-power/gracias-plan-power.component';
import { GraciasPlanComponent } from './components/admin/gracias-plan/gracias-plan.component';
import { ContraseniaPublicComponent } from './components/public/contrasenia-public/contrasenia-public.component';
import { ContraseniaGraciasComponent } from './components/public/contrasenia-gracias/contrasenia-gracias.component';
import { PagoExitoPLanMensualComponent } from './components/admin/pago-exito-plan-mensual/pago-exito-plan-mensual.component';
import { PagoExitoPLanAnualComponent } from './components/admin/pago-exito-plan-anual/pago-exito-plan-anual.component';
import { CambiarPLanComponent } from './components/admin/cambiar-plan/cambiar-plan.component';
import { DuplicarNegocioComponent } from './components/admin/duplicar-negocio/duplicar-negocio.component';
import { QrCodeComponent } from './components/admin/qr-code/qr-code.component';
import { ConfiguracionComponent } from './components/admin/configuracion/configuracion.component';
import { ConfigurarNegocioComponent } from './components/admin/configurar-negocio/configurar-negocio.component';
import { ShareAdminComponent } from './components/admin/share-admin/share-admin.component';
import { CategoriasComponent } from './components/admin/categorias/categorias.component';
import { FooterAdminComponent } from './components/admin/footer-admin/footer-admin.component';
import { SafePipe } from './pipes/safe.pipe';


@NgModule({
	declarations: [
		AppComponent,
		PublicComponent,
		InicioAdminComponent,
		LoginComponent,
		NegocioComponent,
		CardItemComponent,
		CardItemDestacadoComponent,
		DetalleItemComponent,
		ShareComponent,
		RegistroComponent,
		ContraseniaPublicComponent,
		DestacadosNegocioComponent,
		SafePipe
		
		// ListaNegociosComponent,
		// AgregarNegocioComponent,
		// CrearCategoriaItemComponent,
		// EliminarItemComponent,
		// CardItemAdminComponent,
		// ColorComponent,
		// EditarNegocioComponent,
		// VistaQrComponent,
		// DetalleItemAdminComponent,
		// EliminarNegocioComponent,
		// AdicionalesComponent,
		// UpgradeComponent,
		// CardNegocioAdminComponent,
		// CuentaComponent,
		// PlanComponent,
		// ContraseniaComponent,
		// ActualizarDatosComponent,
		// AgregarCelularComponent,
		// HeaderNegocioComponent,
		// ContentNegocioComponent,
		// DestacadosNegocioComponent,
		// ItemsNegocioComponent,
		// FooterNegocioComponent,
		// CompartirNegocioComponent,
		// CompartirItemComponent,
		// GraciasPlanPowerComponent,
		// GraciasPlanComponent,
		// ContraseniaGraciasComponent,
		// PagoExitoPLanMensualComponent,
		// PagoExitoPLanAnualComponent,
		// CambiarPLanComponent,
		// DuplicarNegocioComponent,
		// CategoriasComponent,
		// FooterAdminComponent,
		
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		FormsModule,
		ReactiveFormsModule,
		provideFirebaseApp(() => initializeApp(environment.firebase)),
		provideAnalytics(() => getAnalytics()),
		provideAuth(() => getAuth()),
		provideFirestore(() => getFirestore()),
		provideFunctions(() => getFunctions()),
		provideMessaging(() => getMessaging()),
		providePerformance(() => getPerformance()),
		provideRemoteConfig(() => getRemoteConfig()),
		provideStorage(() => getStorage()),
		MaterialModule,
		QRCodeModule,
		DragDropModule,
		ClipboardModule,
		// ColorChromeModule,
		TablerIconsAngularModule,
		SwiperModule
		// TablerIconsModule.pick(TablerIcons),
		// EditorModule,
		// SwiperModule,
		// ColorSketchModule,
	],
	providers: [
		ScreenTrackingService, UserTrackingService,
		{ provide: LOCALE_ID, useValue: 'es-Es' },
		{ provide: FIREBASE_OPTIONS, useValue: environment.firebase },
	],
	bootstrap: [AppComponent],
	schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
