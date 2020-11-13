import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Post } from 'src/services/post';
import { PhotoService } from '../services/photo.service';

@Component({
  selector: 'app-mostrar-produto',
  templateUrl: './mostrar-produto.page.html',
  styleUrls: ['./mostrar-produto.page.scss'],
})
export class MostrarProdutoPage implements OnInit {

  idProduto: string = "";
  nomeProduto: string = "";
  idFornecedor: string = "";
  categoria: string = "";
  valor: string = "";
  unidadeMedida: string = "";
  qtEstoque: string ="" ;
  qtMinimaPedido: string ="" ;
  fotos:string [];

  constructor(private router: Router,private actRouter: ActivatedRoute,public photoService: PhotoService,  private provider: Post,) { }

  ngOnInit() {
   
    this.actRouter.params.subscribe((data:any)=>{
      this.idProduto = data.id;
      this.nomeProduto = data.nomeProduto;
      this.categoria = data.categoria;
      this.valor = data.valor;
      this.idFornecedor = data.idFornecedor;
      this.unidadeMedida = data.unidadeMedida;
      this.qtMinimaPedido = data.qtMinimaPedido;
      this.qtEstoque = data.qtEstoque;

      this.obterFotos(data.idProduto);
    });

    
  }
  ionViewWillEnter(){
    
     
       this.obterFotos(this.idProduto);
      
  }



  produtos(){
    this.router.navigate(['/produtos']);
  }

   obterFotos(idProduto){

  
    return new Promise(resolve => {
  
      this.fotos = [];
      let dados = {
        requisicao : 'lista_imagem',
        idProduto : idProduto       
        };

        this.provider.dadosApi(dados, 'apiProdutos.php').subscribe(data => {

         console.log(data['result']) ;
        if(data['result'] == '0') {
          resolve(false);
        }else{
          for(let foto of data['result']){
            this.fotos.push(foto);
            
          }
        }
         
       
         resolve(true);
         
        });
    });





  }

  public obterUriFotos(nomeFoto){
    return this.photoService.obterUriFotos(nomeFoto);
  }

}
