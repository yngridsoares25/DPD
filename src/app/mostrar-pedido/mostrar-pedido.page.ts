import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from 'src/services/post';
import { DataService } from '../data.service';
import { Storage} from '@capacitor/core';

@Component({
  selector: 'app-mostrar-pedido',
  templateUrl: './mostrar-pedido.page.html',
  styleUrls: ['./mostrar-pedido.page.scss'],
  
})
export class MostrarPedidoPage implements OnInit {

  pedido: any ;
  nivelUsuario:string="";
  idUsuario: string="";

  dadosLogin: any;
  dt_atual: string ="" ;

  constructor(private router: Router,private activatedRoute: ActivatedRoute,private provider: Post,private dataService: DataService) { }

  ngOnInit() {

    this.obterDadosUsuario();

    this.dt_atual = this.dataHoje();
    this.activatedRoute.queryParams.subscribe(params => {
        let data = params;
        this.pedido = data;
    });

  }

  goToBack(){

      this.router.navigate(['/pedidos']);

  }

  dataHoje() {
    var data = new Date();
    var dia = data.getDate();
    var mes = data.getMonth() + 1;
    var ano = data.getFullYear();
    return [dia, mes, ano].join('/');
  }

  obterDadosUsuario(){
    this.dadosLogin =  Storage.get({ key: 'session_storage' });
  
    const obj  = JSON.parse(this.dadosLogin.__zone_symbol__value.value) || [];
    this.idUsuario = obj.id;
    this.nivelUsuario = obj.nivel;
          
  }
}
