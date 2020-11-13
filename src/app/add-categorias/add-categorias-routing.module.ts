import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddCategoriasPage } from './add-categorias.page';

const routes: Routes = [
  {
    path: '',
    component: AddCategoriasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddCategoriasPageRoutingModule {}
