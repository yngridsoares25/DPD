import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-mostrar-produto',
  templateUrl: './mostrar-produto.page.html',
  styleUrls: ['./mostrar-produto.page.scss'],
})
export class MostrarProdutoPage implements OnInit {

  id: string = "";
  nomeProduto: string = "";
  idUsuario: string = "";
  categoria: string = "";
  valor: string = "";
  unidadeMedida: string = "";
  qtEstoque: string ="" ;
  qtMinimaPedido: string ="" ;

  constructor(private router: Router,private actRouter: ActivatedRoute) { }

  ngOnInit() {
    this.actRouter.params.subscribe((data:any)=>{
      this.id = data.id;
      this.nomeProduto = data.nomeProduto;
      this.categoria = data.categoria;
      this.valor = data.valor;
      this.idUsuario = data.idUsuario;
      this.unidadeMedida = data.unidadeMedida;
      this.qtMinimaPedido = data.qtMinimaPedido;
      this.qtEstoque = data.qtEstoque;
    });
  }



  produtos(){
    this.router.navigate(['/produtos']);
  }
}
