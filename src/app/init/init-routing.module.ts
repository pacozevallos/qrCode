import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { InitComponent } from './init/init.component';
import { InicioComponent } from '../components/public/inicio/inicio.component';
import { RegistroComponent } from '../components/public/registro/registro.component';
import { LoginComponent } from '../components/public/login/login.component';
import { ContraseniaPublicComponent } from '../components/public/contrasenia-public/contrasenia-public.component';
import { ContraseniaGraciasComponent } from '../components/public/contrasenia-gracias/contrasenia-gracias.component';
import { SelectPLanComponent } from '../components/admin/select-plan/select-plan.component';
import { CaracteristicasComponent } from './caracteristicas/caracteristicas.component';
import { PreciosComponent } from './precios/precios.component';
import { ContactoComponent } from './contacto/contacto.component';


const routes: Routes = [
  {
    path: '', component: InitComponent,
    children: [
      { path: '', component: InicioComponent },
      { path: 'caracteristicas', component: CaracteristicasComponent },
      { path: 'precios', component: PreciosComponent },
      { path: 'contacto', component: ContactoComponent},
      { path: 'registro', component: RegistroComponent },
      { path: 'login', component: LoginComponent },
      { path: 'recuperarContrasenia', component: ContraseniaPublicComponent },
      { path: 'graciasContrasenia', component: ContraseniaGraciasComponent},
      { path: 'elegirPlan', component: SelectPLanComponent },
    ]
  },
]



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class InitRoutingModule { }
