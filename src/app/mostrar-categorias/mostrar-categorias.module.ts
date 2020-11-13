import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MostrarCategoriasPageRoutingModule } from './mostrar-categorias-routing.module';

import { MostrarCategoriasPage } from './mostrar-categorias.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MostrarCategoriasPageRoutingModule
  ],
  declarations: [MostrarCategoriasPage]
})
export class MostrarCategoriasPageModule {}
