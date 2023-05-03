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
import { FormRegistroComponent } from './form-registro/form-registro.component';
import { MenuComponent } from './menu/menu.component';
import { TerminosCondicionesComponent } from './terminos-condiciones/terminos-condiciones.component';
import { PageTerminosComponent } from './page-terminos/page-terminos.component';
import { ModalTerminosComponent } from './modal-terminos/modal-terminos.component';
import { PoliticaPrivacidadComponent } from './politica-privacidad/politica-privacidad.component';
import { PagePoliticaComponent } from './page-politica/page-politica.component';
import { ModalPoliticaComponent } from './modal-politica/modal-politica.component';



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
    FormRegistroComponent,
    MenuComponent,
    TerminosCondicionesComponent,
    PageTerminosComponent,
    ModalTerminosComponent,
    PoliticaPrivacidadComponent,
    PagePoliticaComponent,
    ModalPoliticaComponent,
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
