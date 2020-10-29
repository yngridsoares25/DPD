import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MostrarPedidoPage } from './mostrar-pedido.page';

const routes: Routes = [
  {
    path: '',
    component: MostrarPedidoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MostrarPedidoPageRoutingModule {}
