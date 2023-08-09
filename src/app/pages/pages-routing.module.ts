import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { AuthGuard } from '../guards/auth.guard';
import { AuthAdmin } from '../guards/authAdmin.guard';


import { PagesComponent } from './pages.component';
import { PortadaComponent } from './portada/portada.component';
import { NuevoUsuarioComponent } from './usuarios/nuevo-usuario/nuevo-usuario.component';
import { ListaUsuariosComponent } from './usuarios/lista-usuarios/lista-usuarios.component';
import { EditarUsuarioComponent } from './usuarios/editar-usuario/editar-usuario.component';
import { ListaAlbumsComponent } from './albunes/lista-albunes/lista-albums.component';
import { NuevoAlbumComponent } from './albunes/nuevo-album/nuevo-album.component';
import { ListaAlbunesOcultosComponent } from './albunes/lista-albunes-ocultos/lista-albunes-ocultos.component';
import { EditarAlbumComponent } from './albunes/editar-album/editar-album.component';
import { ListaFotosComponent } from './fotos/lista-fotos/lista-fotos.component';
import { NuevoFotoComponent } from './fotos/nuevo-foto/nuevo-foto.component';
import { EditarFotoComponent } from './fotos/editar-foto/editar-foto.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    children: [
      {
        path: 'inicio',
        component: PagesComponent,
        children: [
          {
            path: 'portada',
            component: PortadaComponent,
          },
          {
            path:'usuarios',
            canActivate: [AuthAdmin],
            children:[
              {
              path: 'crear',
              component: NuevoUsuarioComponent
              },
              {
                path: 'todos',
                component: ListaUsuariosComponent
              },
              {
                path: 'editar/:id',
                component: EditarUsuarioComponent
              }
            ]
          },
          {
            path:'albunes',
            children:[
              {
                path:'publicados',
                component:ListaAlbumsComponent
              },
              {
                path:'ocultos',
                component:ListaAlbunesOcultosComponent
              },
              {
                path:'nuevo',
                component:NuevoAlbumComponent
              },
              {
                path:'editar/:id',
                component:EditarAlbumComponent
              }
            ]
          },
          {
            path:'fotos',
            children:[
              {
                path:'lista/:idAlbum/:nombre',
                component: ListaFotosComponent
              },
              {
                path:'nuevo/:idAlbum',
                component: NuevoFotoComponent
              },
              {
                path: 'editar/:idFoto',
                component: EditarFotoComponent
              }
            ]
          }
        ],
      }
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
