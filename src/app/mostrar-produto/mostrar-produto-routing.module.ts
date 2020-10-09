import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MostrarProdutoPage } from './mostrar-produto.page';

const routes: Routes = [
  {
    path: '',
    component: MostrarProdutoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MostrarProdutoPageRoutingModule {}
