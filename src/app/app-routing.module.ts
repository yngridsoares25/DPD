import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'folder',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'add-usuario',
    loadChildren: () => import('./add-usuario/add-usuario.module').then( m => m.AddUsuarioPageModule)
  },
  {
    path: 'mostrar-usuario',
    loadChildren: () => import('./mostrar-usuario/mostrar-usuario.module').then( m => m.MostrarUsuarioPageModule)
  },
  {
    path: 'usuarios',
    loadChildren: () => import('./usuarios/usuarios.module').then( m => m.UsuariosPageModule)
  },

  {
  path: 'add-usuario/:id/:nome/:usuario/:senha/:nivel',
    loadChildren: () => import('./add-usuario/add-usuario.module').then( m => m.AddUsuarioPageModule)
  },

  {
    path: 'mostrar-usuario/:id/:nome/:usuario/:senha/:nivel',
    loadChildren: () => import('./mostrar-usuario/mostrar-usuario.module').then( m => m.MostrarUsuarioPageModule)
    },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'produtos',
    loadChildren: () => import('./produtos/produtos.module').then( m => m.ProdutosPageModule)
  },
  {
    path: 'add-produtos',
    loadChildren: () => import('./add-produtos/add-produtos.module').then( m => m.AddProdutosPageModule)
  },
  {
    path: 'add-produtos/:id/:nomeProduto/:categoria/:valor/:idUsuario/:unidadeMedida/:qtMinimaPedido/:qtEstoque',
    loadChildren: () => import('./add-produtos/add-produtos.module').then( m => m.AddProdutosPageModule)
  },
  {
    path: 'mostrar-produto',
    loadChildren: () => import('./mostrar-produto/mostrar-produto.module').then( m => m.MostrarProdutoPageModule)
  },
  {
    path: 'mostrar-produto/:id/:nomeProduto/:categoria/:valor/:idUsuario/:unidadeMedida/:qtMinimaPedido/:qtEstoque',
    loadChildren: () => import('./mostrar-produto/mostrar-produto.module').then( m => m.MostrarProdutoPageModule)
  },




];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
