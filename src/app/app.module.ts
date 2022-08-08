import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DragDropModule } from '@angular/cdk/drag-drop';

// Angularfire2
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAnalyticsModule } from '@angular/fire/analytics';

// Material File input
import { MaterialFileInputModule } from 'ngx-material-file-input';

// Swiper
import { SwiperModule } from 'swiper/angular';

// Español Angular
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
registerLocaleData(localeEs, 'es-ES');

import { QRCodeModule } from 'angularx-qrcode';

import { TablerIconsModule } from 'angular-tabler-icons';
import * as TablerIcons from 'angular-tabler-icons/icons';

import {ClipboardModule} from '@angular/cdk/clipboard';

import { ColorSketchModule } from 'ngx-color/sketch';
import { ColorChromeModule } from 'ngx-color/chrome';

// Angular Material
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule, MAT_RADIO_DEFAULT_OPTIONS } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatBottomSheetModule, MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';

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
import { EditarItemComponent } from './components/admin/editar-item/editar-item.component';
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
import { LogoNegocioComponent } from './components/admin/logo-negocio/logo-negocio.component';
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

@NgModule({
  declarations: [
    AppComponent,
    PublicComponent,
    HeaderComponent,
    FooterComponent,
    InicioComponent,
    AdminComponent,
    HeaderAdminComponent,
    InicioAdminComponent,
    LoginComponent,
    CrearItemComponent,
    ListaNegociosComponent,
    AgregarNegocioComponent,
    DetalleNegocioComponent,
    ListaItemsComponent,
    CrearCategoriaItemComponent,
    EliminarItemComponent,
    NegocioComponent,
    CardItemComponent,
    CardItemDestacadoComponent,
    DetalleItemComponent,
    EditarItemComponent,
    ShareComponent,
    CardItemAdminComponent,
    RegistroComponent,
    ColorComponent,
    EditarNegocioComponent,
    VistaQrComponent,
    DetalleItemAdminComponent,
    EliminarNegocioComponent,
    AdicionalesComponent,
    AgregarRedesComponent,
    UpgradeComponent,
    LogoNegocioComponent,
    CardNegocioAdminComponent,
    CuentaComponent,
    PlanComponent,
    ContraseniaComponent,
    ActualizarDatosComponent,
    SelectPLanComponent,
    AgregarCelularComponent,
    HeaderNegocioComponent,
    ContentNegocioComponent,
    DestacadosNegocioComponent,
    ItemsNegocioComponent,
    FooterNegocioComponent,
    CompartirNegocioComponent,
    CompartirItemComponent,
    GraciasPlanPowerComponent,
    GraciasPlanComponent,
    ContraseniaPublicComponent,
    ContraseniaGraciasComponent,
    PagoExitoPLanMensualComponent,
    PagoExitoPLanAnualComponent,
    CambiarPLanComponent,
    DuplicarNegocioComponent,
    QrCodeComponent,
    ConfiguracionComponent
  ],
  entryComponents: [
    CrearCategoriaItemComponent,
    DetalleItemComponent,
    ShareComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireAnalyticsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatButtonModule,
    MatSliderModule,
    MatSnackBarModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatSlideToggleModule,
    MatIconModule,
    MatGridListModule,
    MatAutocompleteModule,
    MatCardModule,
    MatTabsModule,
    MatToolbarModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatChipsModule,
    MatSidenavModule,
    MatListModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatStepperModule,
    MatExpansionModule,
    MatTooltipModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MaterialFileInputModule,
    SwiperModule,
    QRCodeModule,
    TablerIconsModule.pick(TablerIcons),
    DragDropModule,
    ClipboardModule,
    ColorSketchModule,
    ColorChromeModule,
  ],
  exports: [
    TablerIconsModule
  ],
  providers: [
    { provide: MAT_BOTTOM_SHEET_DATA, useValue: {} },
    { provide: MatBottomSheetRef, useValue: {} },
    { provide: LOCALE_ID, useValue: 'es-Es' }
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
