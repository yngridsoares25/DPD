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
    path: 'add-produtos/:idProduto/:nomeProduto/:categoria/:valor/:idUsuario/:unidadeMedida/:qtMinimaPedido/:qtEstoque',
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
  {
    path: 'add-pedido',
    loadChildren: () => import('./add-pedido/add-pedido.module').then( m => m.AddPedidoPageModule)
  },
  {
    path: 'pedidos',
    loadChildren: () => import('./pedidos/pedidos.module').then( m => m.PedidosPageModule)
  },
  {
    path: 'mostrar-pedido',
    loadChildren: () => import('./mostrar-pedido/mostrar-pedido.module').then( m => m.MostrarPedidoPageModule)
  },
  {
    path: 'add-usuario/:urlVoltar',
      loadChildren: () => import('./add-usuario/add-usuario.module').then( m => m.AddUsuarioPageModule)
    },
  {
    path: 'configuracoes',
    loadChildren: () => import('./configuracoes/configuracoes.module').then( m => m.ConfiguracoesPageModule)
  },
  {
    path: 'categorias',
    loadChildren: () => import('./categorias/categorias.module').then( m => m.CategoriasPageModule)
  },
  {
    path: 'add-categorias',
    loadChildren: () => import('./add-categorias/add-categorias.module').then( m => m.AddCategoriasPageModule)
  },
  {
    path: 'mostrar-categorias',
    loadChildren: () => import('./mostrar-categorias/mostrar-categorias.module').then( m => m.MostrarCategoriasPageModule)
  },
  {
    path: 'add-categorias/:id/:nomeCategoria',
    loadChildren: () => import('./add-categorias/add-categorias.module').then( m => m.AddCategoriasPageModule)
  },

  ];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
