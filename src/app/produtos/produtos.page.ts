import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from 'src/services/post';


@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.page.html',
  styleUrls: ['./produtos.page.scss'],
})
export class ProdutosPage implements OnInit {

  produtos : any = [];
  limit : number = 10;
  start : number = 0;
  nomeProduto : string = "";

  constructor(private router: Router,  private provider: Post) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.produtos = [];
    this.start = 0;
    this.carregar();
  }


  addProdutos(){
    this.router.navigate(['/add-produtos']);
  }

  carregar(){
    return new Promise(resolve => {
      this.produtos = [];
      let dados = {
        requisicao : 'listar',
        nomeProduto : this.nomeProduto, 
        limit : this.limit,
        start : this.start
        };

        this.provider.dadosApi(dados, 'apiProdutos.php').subscribe(data => {

        if(data['result'] == '0') {
          this.ionViewWillEnter();
        }else{
          for(let produto of data['result']){
            this.produtos.push(produto);
            
          }
        }
         
         resolve(true);
         
        });
    });
    
  }

  editar(id, nomeProduto, categoria, valor,  unidadeMedida, qtEstoque,qtMinimaPedido ,idUsuario){
    // tslint:disable-next-line: max-line-length

    this.router.navigate(['/add-produtos/' + id + '/' + nomeProduto + '/' + categoria + '/' + valor  + '/' + idUsuario + '/'+ unidadeMedida +'/' + qtMinimaPedido + '/' + qtEstoque ]);
  }

  
  mostrar(id, nomeProduto, categoria, valor,  unidadeMedida, qtEstoque,qtMinimaPedido ,idUsuario){
    // tslint:disable-next-line: max-line-length
    this.router.navigate(['/mostrar-produto/'  + id + '/' + nomeProduto + '/' + categoria + '/' + valor  + '/' + idUsuario + '/'  + unidadeMedida + '/' + qtMinimaPedido + '/' + qtEstoque ]);
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
  


}
