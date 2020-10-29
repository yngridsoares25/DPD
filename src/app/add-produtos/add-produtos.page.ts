
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PhotoService } from '../services/photo.service';
import { ActionSheetController, LoadingController, Platform, ToastController } from '@ionic/angular';
import { Post } from './../../services/post';
import { Storage} from '@capacitor/core';

@Component({
  selector: 'app-add-produtos',
  templateUrl: './add-produtos.page.html',
  styleUrls: ['./add-produtos.page.scss'],
})
export class AddProdutosPage implements OnInit {

  images = [];
  nomeProduto: string = "";
  categoria: string = "";
  valor: string = "";
  unidadeMedida: string = "";
  qtEstoque: string ="" ;
  qtMinimaPedido: string ="" ;
  urlImagem: string ="" ;
  idProduto: string = "";
  idFornecedor: String ="";
  dadosLogin: any;
  public dadosStorage:  Usuario[] = [];
  
  // tslint:disable-next-line: max-line-length
  constructor(private actRouter: ActivatedRoute, private router: Router, private provider: Post, public toastController: ToastController,public photoService: PhotoService) { }




  async ngOnInit() {
    await this.photoService.loadSaved();

    this.actRouter.params.subscribe((data:any)=>{
      this.idProduto = data.idProduto;
      this.nomeProduto = data.nomeProduto;
      this.categoria = data.categoria;
      this.valor = data.valor;
      this.idFornecedor = data.idFornecedor;
      this.unidadeMedida = data.unidadeMedida;
      this.qtMinimaPedido = data.qtMinimaPedido;
      this.qtEstoque = data.qtEstoque;
    });

  
  }
  
  obterDadosStorage() {
            this.dadosLogin =  Storage.get({ key: 'session_storage' });

            const obj  = JSON.parse(this.dadosLogin.__zone_symbol__value.value) || [];
            console.log(obj);
            return obj.id;
  }


  cadastrar(){
    return new Promise(resolve => {
  

      let dados = {
        requisicao : 'add',
        nomeProduto : this.nomeProduto, 
        categoria : this.categoria, 
        valor : this.valor, 
        unidadeMedida : this.unidadeMedida, 
        qtEstoque : this.qtEstoque, 
        qtMinimaPedido : this.qtMinimaPedido,
        idFornecedor:this.obterDadosStorage(), 
        urlImagem: "",
        };

        this.provider.dadosApi(dados, 'apiProdutos.php').subscribe(data => {
          this.router.navigate(['/produtos']);
          this.mensagemSalvar();
        });
    });
  }


  editar(){
    return new Promise(resolve => {
      
      let dados = {
        requisicao : 'editar',
        idProduto : this.idProduto, 
        nomeProduto : this.nomeProduto, 
        categoria : this.categoria, 
        valor : this.valor, 
        unidadeMedida : this.unidadeMedida, 
        qtMinimaPedido : this.qtMinimaPedido,
        idFornecedor:this.obterDadosStorage(), 
        urlImagem: "",
        qtEstoque : this.qtEstoque, 
        };

        this.provider.dadosApi(dados, 'apiProdutos.php').subscribe(data => {
          this.router.navigate(['/produtos']);
          this.mensagemSalvar();
        });
    });
  }


  addPhotoToGallery() {
    this.photoService.addNewToGallery();
  }

  deletarFoto(index){
     this.photoService.deleteSaved(index);
  }
  produtos(){
    this.router.navigate(['/produtos']);
  }

  async mensagemSalvar() {
    const toast = await this.toastController.create({
      message: 'Salvo com Sucesso!!',
      duration: 1000
    });
    toast.present();
  }

}



export interface Usuario {
  nome : String, 
  usuario : String, 
  senha : String, 
  nivel : String, 
  id : String, 
}
