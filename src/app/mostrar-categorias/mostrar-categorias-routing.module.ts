import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MostrarCategoriasPage } from './mostrar-categorias.page';

const routes: Routes = [
  {
    path: '',
    component: MostrarCategoriasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MostrarCategoriasPageRoutingModule {}
