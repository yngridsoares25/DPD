import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from 'src/services/post';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.page.html',
  styleUrls: ['./usuarios.page.scss'],
})
export class UsuariosPage implements OnInit {


  usuarios : any = [];
  limit : number = 10;
  start : number = 0;
  nome : string = "";

  constructor(private router: Router,  private provider: Post) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.usuarios = [];
    this.start = 0;
    this.carregar();
  }

  addUsuarios(){
    this.router.navigate(['/add-usuario']);
  }

  carregar(){
    return new Promise(resolve => {
      this.usuarios = [];
      let dados = {
        requisicao : 'listar',
        nome : this.nome, 
        limit : this.limit,
        start : this.start
        };

        this.provider.dadosApi(dados, 'apiUsuarios.php').subscribe(data => {

        if(data['result'] == '0') {
          this.ionViewWillEnter();
        }else{
          for(let usuario of data['result']){
            this.usuarios.push(usuario);
            
          }
        }
         
         resolve(true);
         
        });
    });
    
  }


  editar(id, nome, usuario, senha, nivel){
    this.router.navigate(['/add-usuario/' + id + '/' + nome + '/' + usuario + '/' + senha + '/' + nivel]);
  }

  mostrar(id, nome, usuario, senha, nivel){
    this.router.navigate(['/mostrar-usuario/' + id + '/' + nome + '/' + usuario + '/' + senha + '/' + nivel]);
  }

  
  excluir(id){
    return new Promise(resolve => {
      
      let dados = {
        requisicao : 'excluir',
        id : id, 
        };

        this.provider.dadosApi(dados, 'apiUsuarios.php').subscribe(data => {
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
