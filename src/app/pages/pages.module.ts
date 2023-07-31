import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { SharedModule } from '../shared/shared.module';
import { PagesComponent } from './pages.component';
import { PortadaComponent } from './portada/portada.component';
import { UsuariosModule } from './usuarios/usuarios.module';
import { NotFoundComponent } from './not-found/not-found.component';
import { AlbumModule } from './albunes/album.module';
import { FotosModule } from './fotos/fotos.module';


@NgModule({
  declarations: [
    PagesComponent,
    PortadaComponent,
    NotFoundComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    SharedModule,
    UsuariosModule,
    AlbumModule,
    FotosModule
  ],
  exports:[
    PagesComponent
  ]
})
export class PagesModule { }
