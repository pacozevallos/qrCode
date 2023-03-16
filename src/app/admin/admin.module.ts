import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { EditorModule } from "@tinymce/tinymce-angular";

// Tabler icons
import { TablerIconsAngularModule } from '../tabler-icons-angular.module';


import { UploadImagesComponent } from './upload-images/upload-images.component';
import { ListaItemsComponent } from '../components/admin/lista-items/lista-items.component';
import { CrearItemComponent } from '../components/admin/crear-item/crear-item.component';
import { DetalleNegocioComponent } from '../components/admin/detalle-negocio/detalle-negocio.component';
import { AdminRoutingModule } from './admin-routing.module';
import { HeaderAdminComponent } from '../components/admin/header-admin/header-admin.component';
import { AdminComponent } from '../components/admin/admin/admin.component';



@NgModule({
  declarations: [
    DetalleNegocioComponent,
    ListaItemsComponent,
    CrearItemComponent,
    UploadImagesComponent,
    HeaderAdminComponent,
    AdminComponent
    
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    TablerIconsAngularModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    EditorModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AdminModule { }
