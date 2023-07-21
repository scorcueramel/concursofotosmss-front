import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { SharedModule } from '../shared/shared.module';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { PagesComponent } from './pages.component';
import { PortadaComponent } from './portada/portada.component';
import { UsuariosModule } from './usuarios/usuarios.module';
import { NotFoundComponent } from './not-found/not-found.component';
import { PanelModule } from 'primeng/panel';

@NgModule({
  declarations: [
    PagesComponent,
    PortadaComponent,
    NotFoundComponent,
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    SharedModule,
    CardModule,
    ButtonModule,
    UsuariosModule,
    PanelModule
  ],
  exports:[
    PagesComponent
  ]
})
export class PagesModule { }
