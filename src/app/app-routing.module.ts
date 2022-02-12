import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './components/admin/admin/admin.component';
import { InicioAdminComponent } from './components/admin/inicio-admin/inicio-admin.component';
import { InicioComponent } from './components/public/inicio/inicio.component';
import { PublicComponent } from './components/public/public/public.component';
import { LoginComponent } from './components/public/login/login.component';

import { AngularFireAuthGuard, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { CrearItemComponent } from './components/admin/crear-item/crear-item.component';
import { ListaNegociosComponent } from './components/admin/lista-negocios/lista-negocios.component';
import { DetalleNegocioComponent } from './components/admin/detalle-negocio/detalle-negocio.component';
import { NegocioComponent } from './components/public/negocio/negocio.component';
const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['/login']);

const routes: Routes = [
  {
    path: '', component: PublicComponent,
    children: [
      { path: '', component: InicioComponent },
      { path: 'negocio/:id', component: NegocioComponent },
      { path: 'login', component: LoginComponent },

    ]
  },
  {
    path: 'admin', component: AdminComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin },
    // path: 'admin', component: AdminComponent,
    children: [
      { path: '', component: ListaNegociosComponent },
      // { path: 'listaNegocios', component: ListaNegociosComponent },
      { path: 'listaNegocios/:id', component: DetalleNegocioComponent },
    ]
  },
  { path: '', redirectTo: 'es', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
