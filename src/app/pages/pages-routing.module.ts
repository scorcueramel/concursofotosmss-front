import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';
import { PagesComponent } from './pages.component';
import { PortadaComponent } from './portada/portada.component';
import { NuevoUsuarioComponent } from './usuarios/nuevos-usuario/nuevo-usuario.component';
import { AuthAdmin } from '../guards/authAdmin.guard';
import { NotFoundComponent } from './not-found/not-found.component';
import { ListaUsuariosComponent } from './usuarios/lista-usuarios/lista-usuarios.component';
import { EditarUsuarioComponent } from './usuarios/editar-usuario/editar-usuario.component';

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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
