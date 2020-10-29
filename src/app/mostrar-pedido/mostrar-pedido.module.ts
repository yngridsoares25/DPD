import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MostrarPedidoPageRoutingModule } from './mostrar-pedido-routing.module';

import { MostrarPedidoPage } from './mostrar-pedido.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MostrarPedidoPageRoutingModule
  ],
  declarations: [MostrarPedidoPage]
})
export class MostrarPedidoPageModule {}
