import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalBuscarTaquillaPage } from './modal-buscar-taquilla.page';

const routes: Routes = [
  {
    path: '',
    component: ModalBuscarTaquillaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalBuscarTaquillaPageRoutingModule {}
