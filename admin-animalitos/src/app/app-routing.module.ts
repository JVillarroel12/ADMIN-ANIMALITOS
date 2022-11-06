import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'modal-buscar-taquilla',
    loadChildren: () => import('./modals/modal-buscar-taquilla/modal-buscar-taquilla.module').then( m => m.ModalBuscarTaquillaPageModule)
  },
  {
    path: 'modal-bloquear-animalito',
    loadChildren: () => import('./modals/modal-bloquear-animalito/modal-bloquear-animalito.module').then( m => m.ModalBloquearAnimalitoPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
