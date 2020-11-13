import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddCategoriasPageRoutingModule } from './add-categorias-routing.module';

import { AddCategoriasPage } from './add-categorias.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddCategoriasPageRoutingModule
  ],
  declarations: [AddCategoriasPage]
})
export class AddCategoriasPageModule {}
