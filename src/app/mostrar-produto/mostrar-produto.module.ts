import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MostrarProdutoPageRoutingModule } from './mostrar-produto-routing.module';

import { MostrarProdutoPage } from './mostrar-produto.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MostrarProdutoPageRoutingModule
  ],
  declarations: [MostrarProdutoPage]
})
export class MostrarProdutoPageModule {}
