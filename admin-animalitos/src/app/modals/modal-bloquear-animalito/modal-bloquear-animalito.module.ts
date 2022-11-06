import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalBloquearAnimalitoPageRoutingModule } from './modal-bloquear-animalito-routing.module';

import { ModalBloquearAnimalitoPage } from './modal-bloquear-animalito.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalBloquearAnimalitoPageRoutingModule
  ],
  declarations: [ModalBloquearAnimalitoPage]
})
export class ModalBloquearAnimalitoPageModule {}
