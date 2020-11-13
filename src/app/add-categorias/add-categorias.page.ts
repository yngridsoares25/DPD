import { Post } from './../../services/post';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-add-categorias',
  templateUrl: './add-categorias.page.html',
  styleUrls: ['./add-categorias.page.scss'],
})
export class AddCategoriasPage implements OnInit {

  nomeCategoria: string = "";
  id: string = "";
  urlVoltar: string="";



  // tslint:disable-next-line:max-line-length
  constructor(private actRouter: ActivatedRoute, private router: Router, private provider: Post, public toastController: ToastController) { }

  ngOnInit() {
    this.actRouter.params.subscribe((data:any)=>{
      this.id = data.id;
      this.nomeCategoria = data.nomeCategoria;

    });
  }



  async mensagemSalvar () {
    const toast = await this.toastController.create({
      message: 'Salvo com Sucesso!!',
      duration: 1000
    });
    toast.present();
  }

  cadastrar(){
    return new Promise(resolve => {
      
      // tslint:disable-next-line:prefer-const
      let dados = {
        requisicao : 'add',
        // tslint:disable-next-line:no-trailing-whitespace
        nomeCategoria : this.nomeCategoria, 
        }

        // tslint:disable-next-line:align
        this.provider.dadosApi(dados, 'apiCategorias.php').subscribe(data => {
          this.router.navigate(['/categorias']);
          this.mensagemSalvar();
        });
  });

}

editar(){
  return new Promise(resolve => {
    
    let dados = {
      requisicao : 'editar',
      id : this.id, 
      nomeCategoria : this.nomeCategoria, 
      };

      this.provider.dadosApi(dados, 'apiCategorias.php').subscribe(data => {
        this.router.navigate(['/categorias']);
        this.mensagemSalvar();
      });
  });
}



Categoria(){

  this.router.navigate(['/categorias']);
}

}
