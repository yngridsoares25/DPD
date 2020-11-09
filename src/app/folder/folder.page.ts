import { ToastController } from '@ionic/angular';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Post } from 'src/services/post';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Storage} from '@capacitor/core';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage  {

  public parametro: string;

  nivel: string;
  nome: string;
  dadosLogin: any;
  qtProduto:String;
  qtPedidos:String;
  idUsuario: string="";
  nivelUsuario:string="";
  constructor(private router: Router, private provider: Post, private storage: NativeStorage, public toast: ToastController) { }

 

  ionViewWillEnter(){
      this.contarProdutos();
      this.contarPedidos();
      this.obterDadosStorage();
      this.obterDadosUsuarioPhone();
 

  }
  obterDadosStorage() {
    this.dadosLogin =  Storage.get({ key: 'session_storage' });

    console.log(this.dadosLogin);
    const obj  = JSON.parse(this.dadosLogin.__zone_symbol__value.value) || [];

    this.nome = obj.nome;
    this.nivel = obj.nivel;
    
}

  logout(){
    this.storage.clear();
    this.router.navigate(['/login']);
  }


  contarProdutos(){
    this.obterDadosUsuario();
    return new Promise(resolve => {
  

      let dados = {
        requisicao : 'contarProduto',
         idUsuario : this.idUsuario ,
        nivelUsuario : this.nivelUsuario
        };

      this.provider.dadosApi(dados, 'apiProdutos.php').subscribe(data => {
        console.log(data);
        if(data['result'] == '0') {
          this.ionViewWillEnter();
        }else{
          for(let produto of data['result']){
            this.qtProduto= produto.qtProduto;
          }
        }

       
         resolve(true);
        });
    });
  }

  contarPedidos(){
    return new Promise(resolve => {
  
     
      let dados = {
        requisicao : 'contarPedidos',
        idUsuario : this.idUsuario ,
        nivelUsuario : this.nivelUsuario

        };

      this.provider.dadosApi(dados, 'apiPedidos.php').subscribe(data => {
        console.log(data);
        if(data['result'] == '0') {
          this.ionViewWillEnter();
        }else{
          for(let produto of data['result']){
            this.qtPedidos= produto.qtPedido;
          }
        }

       
         resolve(true);
        });
    });
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
    this.nome = this.dadosLogin.nome;
    this.nivel = this.dadosLogin.nivel;
  })
        
}

goToProdutos(){

  this.router.navigate(['/produtos']);
}

goToPedidos(){

  this.router.navigate(['/pedidos']);
}


}
