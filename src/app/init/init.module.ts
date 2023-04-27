import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CaracteristicasComponent } from './caracteristicas/caracteristicas.component';
import { InitComponent } from './init/init.component';
import { PreciosComponent } from './precios/precios.component';
import { ContactoComponent } from './contacto/contacto.component';
import { InitRoutingModule } from './init-routing.module';
import { HeaderComponent } from '../components/public/header/header.component';
import { FooterComponent } from '../components/public/footer/footer.component';
import { MaterialModule } from '../material.module';
import { FormInitComponent } from './form-init/form-init.component';
import { InicioComponent } from '../components/public/inicio/inicio.component';
import { TablerIconsAngularModule } from '../tabler-icons-angular.module';



@NgModule({
  declarations: [
    CaracteristicasComponent,
    InitComponent,
    InicioComponent,
    PreciosComponent,
    ContactoComponent,
    HeaderComponent,
		FooterComponent,
    FormInitComponent,
  ],
  imports: [
    CommonModule,
    InitRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    TablerIconsAngularModule,
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class InitModule { }
