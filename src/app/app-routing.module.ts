import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './components/admin/admin/admin.component';
import { InicioAdminComponent } from './components/admin/inicio-admin/inicio-admin.component';
import { InicioComponent } from './components/public/inicio/inicio.component';
import { PublicComponent } from './components/public/public/public.component';
import { LoginComponent } from './components/public/login/login.component';

import { AngularFireAuthGuard, redirectUnauthorizedTo } from '@angular/fire/compat/auth-guard';
import { CrearItemComponent } from './components/admin/crear-item/crear-item.component';
import { ListaNegociosComponent } from './components/admin/lista-negocios/lista-negocios.component';
import { DetalleNegocioComponent } from './components/admin/detalle-negocio/detalle-negocio.component';
import { NegocioComponent } from './components/public/negocio/negocio.component';
import { DetalleItemComponent } from './components/public/detalle-item/detalle-item.component';
import { AgregarNegocioComponent } from './components/admin/agregar-negocio/agregar-negocio.component';
import { RegistroComponent } from './components/public/registro/registro.component';
import { VistaQrComponent } from './components/admin/vista-qr/vista-qr.component';
import { CuentaComponent } from './components/admin/cuenta/cuenta.component';
import { ContraseniaComponent } from './components/admin/contrasenia/contrasenia.component';
import { PlanComponent } from './components/admin/plan/plan.component';
import { ActualizarDatosComponent } from './components/admin/actualizar-datos/actualizar-datos.component';
import { SelectPLanComponent } from './components/admin/select-plan/select-plan.component';
import { ContentNegocioComponent } from './components/public/content-negocio/content-negocio.component';
import { ListaItemsComponent } from './components/admin/lista-items/lista-items.component';
import { DetalleItemAdminComponent } from './components/admin/detalle-item-admin/detalle-item-admin.component';
import { GraciasPlanComponent } from './components/admin/gracias-plan/gracias-plan.component';
import { ContraseniaPublicComponent } from './components/public/contrasenia-public/contrasenia-public.component';
import { ContraseniaGraciasComponent } from './components/public/contrasenia-gracias/contrasenia-gracias.component';
import { PagoExitoPLanMensualComponent } from './components/admin/pago-exito-plan-mensual/pago-exito-plan-mensual.component';
import { PagoExitoPLanAnualComponent } from './components/admin/pago-exito-plan-anual/pago-exito-plan-anual.component';
import { ConfiguracionComponent } from './components/admin/configuracion/configuracion.component';
const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['/login']);

const routes: Routes = [
  {
    path: '', component: PublicComponent,
    children: [
      { path: '', component: InicioComponent },
      // { path: 'negocio/:id', component: NegocioComponent, children: [
      //     { path: '', component: ContentNegocioComponent },
      //     { path: 'item/:id', component: DetalleItemComponent },
      //   ]
      // },
      // { path: 'negocio/:id/item/:id', component: DetalleItemComponent },
      { path: 'registro', component: RegistroComponent },
      { path: 'login', component: LoginComponent },
      { path: 'recuperarContrasenia', component: ContraseniaPublicComponent },
      { path: 'graciasContrasenia', component: ContraseniaGraciasComponent},
      { path: 'elegirPlan', component: SelectPLanComponent },
    ]
  },
  { path: 'tienda/:id', component: NegocioComponent, children: [
      { path: '', component: ContentNegocioComponent },
      { path: 'item/:id', component: DetalleItemComponent },
    ]
  },
  // {
  //   path: 'admin', component: AdminComponent, canActivate: [AngularFireAuthGuard], data: {authGuardPipe: redirectUnauthorizedToLogin},
  //   children: [
  //     { path: '', component: DetalleNegocioComponent },
  //     { path: 'contrasenia', component: ContraseniaComponent },
  //     { path: 'plan', component: PlanComponent },
  //     { path: 'actualizarDatos', component: ActualizarDatosComponent },
  //     { path: 'elegirPlan', component: SelectPLanComponent },
  //     { path: 'graciasPlan', component: GraciasPlanComponent },
  //     { path: 'pagoExitoPlanMensual', component: PagoExitoPLanMensualComponent },
  //     { path: 'pagoExitoPlanAnual', component: PagoExitoPLanAnualComponent },
  //     { path: 'productos', component: ListaItemsComponent},
  //     { path: 'configuracion', component: ConfiguracionComponent },
  //     { path: ':id', component: DetalleNegocioComponent, children: [
  //       { path: 'productos', component: ListaItemsComponent},
  //       { path: 'configuracion', component: ConfiguracionComponent },
  //       { path: 'cuenta', component: CuentaComponent },
  //     ] },
  //   ]
  // },
  {
    path: 'admin', component: DetalleNegocioComponent, canActivate: [AngularFireAuthGuard], data: {authGuardPipe: redirectUnauthorizedToLogin},
    children: [
      { path: '', component: ListaItemsComponent },
      { path: 'productos', component: ListaItemsComponent },
      { path: 'productos/crearItem', component: CrearItemComponent },
      { path: 'configuracion', component: ConfiguracionComponent },
      { path: 'cuenta', component: CuentaComponent },
      { path: 'cuenta/elegirPlan', component: SelectPLanComponent },
      { path: 'cuenta/pagoExitoPlanMensual', component: PagoExitoPLanMensualComponent },
      { path: 'cuenta/pagoExitoPlanAnual', component: PagoExitoPLanAnualComponent },
    ]
  },
  {
    path: 'owner', component: ListaNegociosComponent, data: {
      roles: 'owner',
      authGuardPipe: redirectUnauthorizedToLogin
    }, canActivate: [AngularFireAuthGuard]
  },
  { path: '', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled',
    anchorScrolling: 'enabled',
    onSameUrlNavigation: 'reload',
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
