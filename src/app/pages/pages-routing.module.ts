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
import { AddAlbumComponent } from './albunes/add-album/add-album.component';

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
          }
        ],
      }
    ],
  },
  {
    path:'',
    component: PagesComponent,
    children:[
      {
        path:'inicio',
        children:[
          {
            path:'albunes',
            children:[
              {
                path:'todos',
                component:ListaAlbumsComponent
              },
              {
                path:'nuevo',
                component:NuevoAlbumComponent
              },
              {
                path:'add',
                component:AddAlbumComponent
              }
            ]
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
