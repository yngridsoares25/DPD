import { Time } from '@angular/common';

export interface Pedido {

	idPedido :number;
 	idProduto:number;
  qtProduto:number;
  data_inicial:Date;
  data_final:Date;
  idUsuarioComprador:number;
  idFornecedor:number;
  horario_entrega_1:Time;
  horario_entrega_2:Time;
  endereco:string;
  cidade:string;
  estado:string;
  cep:string;
  categoria:string;
  nomeProduto:string;
  valor:number;
  urlImagem:string;
  unidadeMedida:string;
  qtMinimaPedido:number;
  nome_usuario_comprador:string;
  usuario_vendedor:string;
  qtEstoque:number;
  
}