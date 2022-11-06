import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewEstacionesComponent } from './view-estaciones/view-estaciones.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ViewSorteosComponent } from './view-sorteos/view-sorteos.component';
import { ViewBloquearAnimalitosComponent } from './view-bloquear-animalitos/view-bloquear-animalitos.component';
import { IonicModule } from '@ionic/angular';
import { ViewUsuariosComponent } from './view-usuarios/view-usuarios.component';
import { ViewTopesComponent } from './view-topes/view-topes.component';



@NgModule({
  declarations: [
    ViewEstacionesComponent,
    ViewSorteosComponent,
    ViewBloquearAnimalitosComponent,
    ViewUsuariosComponent,
    ViewSorteosComponent,
    ViewTopesComponent
  ],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    Ng2SearchPipeModule,
    ReactiveFormsModule
  ]
})
export class ComponentsModule { }
