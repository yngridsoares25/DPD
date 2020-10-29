import { Injectable } from '@angular/core';
import { Pedido } from './pedido.interface';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }
  private pedido: Pedido;

  setPedido(pedido: Pedido) {
    this.pedido = pedido;
  }
  getPedido() {
    return this.pedido;
  }

}
