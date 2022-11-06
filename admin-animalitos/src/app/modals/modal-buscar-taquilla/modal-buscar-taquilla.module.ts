import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalBuscarTaquillaPageRoutingModule } from './modal-buscar-taquilla-routing.module';

import { ModalBuscarTaquillaPage } from './modal-buscar-taquilla.page';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalBuscarTaquillaPageRoutingModule,
    Ng2SearchPipeModule
  ],
  declarations: [ModalBuscarTaquillaPage]
})
export class ModalBuscarTaquillaPageModule {}
