import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { PresentacionComponent } from './pages/presentacion/presentacion.component';
import { PublicoComponent } from './pages/publico/publico.component';
import { FotosPublicasComponent } from './pages/fotos-publicas/fotos-publicas.component';
import { VotarFotoComponent } from './pages/votar-foto/votar-foto.component';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'menu',
    loadChildren: () =>
      import('./pages/pages.module').then((m) => m.PagesModule)
  },
  {
    path:'presentacion',
    component: PresentacionComponent
  },
  {
    path:'not-found',
    component: NotFoundComponent
  },
  {
    path:'publico',
    component: PublicoComponent
  },
  {
    path:'publico/fotos/:id',
    component: FotosPublicasComponent
  },
  {
    path:'publico/foto/:id/votar',
    component: VotarFotoComponent
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'not-found'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
