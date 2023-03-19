import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { DetalleNegocioComponent } from '../components/admin/detalle-negocio/detalle-negocio.component';
import { ListaItemsComponent } from '../components/admin/lista-items/lista-items.component';
import { CrearItemComponent } from '../components/admin/crear-item/crear-item.component';
import { ConfiguracionComponent } from '../components/admin/configuracion/configuracion.component';
import { CuentaComponent } from '../components/admin/cuenta/cuenta.component';
import { SelectPLanComponent } from '../components/admin/select-plan/select-plan.component';
import { PagoExitoPLanMensualComponent } from '../components/admin/pago-exito-plan-mensual/pago-exito-plan-mensual.component';
import { PagoExitoPLanAnualComponent } from '../components/admin/pago-exito-plan-anual/pago-exito-plan-anual.component';
import { AdminComponent } from '../components/admin/admin/admin.component';
import { EditarItemComponent } from '../components/admin/editar-item/editar-item.component';


const routes: Routes = [
  {
    path: '', component: AdminComponent,
    children: [
      { path: '', component: ListaItemsComponent },
      { path: 'productos', component: ListaItemsComponent },
      { path: 'productos/crearItem/:id', component: CrearItemComponent },
      { path: 'productos/editarItem/:id', component: EditarItemComponent },
      { path: 'configuracion', component: ConfiguracionComponent },
      { path: 'cuenta', component: CuentaComponent },
      { path: 'cuenta/elegirPlan', component: SelectPLanComponent },
      { path: 'cuenta/pagoExitoPlanMensual', component: PagoExitoPLanMensualComponent },
      { path: 'cuenta/pagoExitoPlanAnual', component: PagoExitoPLanAnualComponent },
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
export class AdminRoutingModule { }
