import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from 'src/services/post';
import { resolve } from 'url';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.page.html',
  styleUrls: ['./categorias.page.scss'],
})
export class CategoriasPage implements OnInit {


  categorias : any =[];
  limit : number = 15;
  start : number = 0;
  nome : string = "";


  constructor(private router: Router,private provider: Post) { }

  ngOnInit() {
    this.carregar();
  }

  ionViewWillEnter() {
    this.start = 0;
  }

  addCategorias() {
    this.router.navigate(['/add-categorias']);
  }


  /*
  *funcao para carregar dados da tela
  * sem parametros
  */
  carregar() {
    this.categorias = [];
    return new Promise(() => {
      let dados = {
        requisicao : 'listar',
        nome : this.nome,
        limit : this.limit,
        start : this.start
      };

      this.provider.dadosApi(dados, 'apiCategorias.php').subscribe(data => {

        if(data['result'] == '0') {
          this.ionViewWillEnter();
        }else{
          for(let categoria of data['result']){
            this.categorias.push(categoria);
            
          }

          console.log(this.categorias);
        }
         
         resolve(true);
         
        });

    });

  }

  editar(id,nome){
    this.router.navigate(['/add-categorias/' + id +'/' + nome]);

  }


  
excluir(id){
  return new Promise(resolve => {
    
    let dados = {
      requisicao : 'excluir',
      id : id, 
      };

      this.provider.dadosApi(dados, 'apiCategorias.php').subscribe(data => {
        this.router.navigate(['/categorias']);
        this.ngOnInit();
      });
  });
}


//fecha a classe
}
