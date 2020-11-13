import { Post } from 'src/services/post';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Pedido } from './pedido.interface';
import { Observable } from 'rxjs';
import { DataService } from '../data.service';
import { Storage} from '@capacitor/core';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { PhotoService } from '../services/photo.service';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.page.html',
  styleUrls: ['./pedidos.page.scss'],
})
export class PedidosPage implements OnInit {

  pedidos : any = [];
  limit : number = 10;
  start : number = 0;
  data_inicial : string = "";
  data_final: string = "";
  pedidosInterface:Pedido[];
  dadosLogin: any;
  nivelUsuario:string="";
  idUsuario: string="";

  constructor(private router: Router,  private provider: Post,private dataService: DataService , private storage: NativeStorage , private photoService: PhotoService) { }




  ngOnInit() {
    this.carregar();

  }

  ionViewWillEnter(){
    this.pedidos = [];
    this.start = 0;


  }

  
  carregar(){
    this.obterDadosUsuario();
    this.obterDadosUsuarioPhone();
    console.log("METODO CARREGAR");

    return new Promise(resolve => {
      this.pedidos = [];
   
      let dados = {
        requisicao : 'listar',
        data_inicial : this.data_inicial, 
        data_final : this.data_final, 
        idUsuario : this.idUsuario,
        nivelUsuario :this.nivelUsuario,
        limit : this.limit,
        start : this.start
        };
     
       
    
      this.provider.dadosApi(dados, 'apiPedidos.php').subscribe(data => {

        if(data['result'] == '0') {
          this.ionViewWillEnter();
        }else{
          for(let pedido  of data['result']){
            this.pedidos.push(pedido);
            
          }
          this.pedidosInterface = data['result'];
        }
         
         resolve(true);
         
        });
    });
    
  }



  editar(pedido:Pedido){
     // console.log(pedido);
      this.dataService.setPedido(pedido);
      
      this.router.navigate(['/add-pedido'], { queryParams: pedido,  skipLocationChange: true });
  }

  


  mostrar(pedido:Pedido){
    // tslint:disable-next-line: max-line-length
    this.dataService.setPedido(pedido);
      this.router.navigate(['/mostrar-pedido'], { queryParams: pedido,  skipLocationChange: true });
  }

  excluir(id){
    return new Promise(resolve => {

      let dados = {
        requisicao : 'excluir',
        id : id, 
        };

        this.provider.dadosApi(dados, 'apiProdutos.php').subscribe(data => {
         this.ionViewWillEnter();
        });
    });
  }


   //atualizar o list view

 doRefresh(event) {
    
  setTimeout(() => {
    this.ionViewWillEnter();
    event.target.complete();
  }, 500);
}


//barra de rolagem
loadData(event) {

  this.start += this.limit;

  setTimeout(() => {
    this.carregar().then(()=>{ 
      event.target.complete();
     });
   
  }, 500);
  
}
  
obterDadosStorage() {

  this.dadosLogin =  Storage.get({ key: 'session_storage' });

  const obj  = JSON.parse(this.dadosLogin.__zone_symbol__value.value) || [];
  console.log(obj.id);
  return obj.id;


}

obterDadosUsuario(){
  this.dadosLogin =  Storage.get({ key: 'session_storage' });

  const obj  = JSON.parse(this.dadosLogin.__zone_symbol__value.value) || [];
  this.idUsuario = obj.id;
  this.nivelUsuario = obj.nivel;
        
}

obterDadosUsuarioPhone(){
  this.storage.getItem('session_storage').then((res)=>{
    this.dadosLogin = res;
    this.idUsuario = this.dadosLogin.id;
    this.nivelUsuario = this.dadosLogin.nivel;
  })
        
}
public obterUriFotos(nomeFoto){
  return this.photoService.obterUriFotos(nomeFoto);
}

}

