
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Photo, PhotoService } from '../services/photo.service';
import { ActionSheetController, LoadingController, Platform, ToastController } from '@ionic/angular';
import { Post } from './../../services/post';
import { Storage} from '@capacitor/core';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

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
  idUsuario: string = "";
  nivelUsuario: string = "";
  nomeUsuario: string = "";
  fotos:string[];
  public dadosStorage:  Usuario[] = [];
  
  // tslint:disable-next-line: max-line-length
  constructor(private actRouter: ActivatedRoute, private router: Router, private provider: Post, public toastController: ToastController,public photoService: PhotoService, private storage: NativeStorage) { }




  async ngOnInit() {
    this.obterDadosUsuario();
    this.obterDadosUsuarioPhone();
    
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
      this.obterFotos(data.idProduto);
    });

  
  }
  
  obterDadosStorage() {
            this.dadosLogin =  Storage.get({ key: 'session_storage' });

            const obj  = JSON.parse(this.dadosLogin.__zone_symbol__value.value) || [];
            console.log(obj);
            if (obj.id == undefined){
              return this.idUsuario;
            }else{
              return obj.id;
            }  
  }

  obterDadosUsuarioPhone(){
    this.storage.getItem('session_storage').then((res)=>{
      this.dadosLogin = res;
      this.idUsuario = this.dadosLogin.id;
      this.nivelUsuario = this.dadosLogin.nivel;
    })
          
  }


  obterDadosUsuario(){
    this.dadosLogin =  Storage.get({ key: 'session_storage' });
  
    const obj  = JSON.parse(this.dadosLogin.__zone_symbol__value.value) || [];
    this.idUsuario = obj.id;
    this.nivelUsuario = obj.nivel;
    this.nomeUsuario = obj.nome;
          
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

          this.uploadFoto(data);

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
     this.atualizarSessionStorage();
  }


  async uploadFoto(data){
 


    console.log("vou subir as fotos",data);
    this.photoService.photos.forEach( (photo,index) => {
      let foto_principal = index == 0 ;
      this.photoService.subirFotos(photo);
      this.salvarFotoBanco(photo,data,foto_principal);
    });
    Storage.clear();
    this.atualizarSessionStorage();
    
  }

  produtos(){

    Storage.clear();
    this.atualizarSessionStorage();
    this.router.navigate(['/produtos']);
  }

  async mensagemSalvar() {

        const toast = await this.toastController.create({
          message: 'Salvo com Sucesso!!',
          duration: 1000
        });
        toast.present();
  }


  atualizarSessionStorage(){

        let dados = {
          id : this.idUsuario,
          nivel : this.nivelUsuario,
          nome: this.nomeUsuario
        }

        this.storage.setItem('session_storage', dados);
        Storage.set({
          key: 'session_storage',
          value: JSON.stringify( dados)
        });

  }


  salvarFotoBanco(photo: Photo,data,foto_principal){

    return new Promise(resolve => {
      
      

      let dados = {
        requisicao : 'add_imagem',
        id_produto : data.id, 
        nome_imagem : photo.filepath, 
        foto_principal : foto_principal
        };

        this.provider.dadosApi(dados, 'apiProdutos.php').subscribe(data => {
          this.router.navigate(['/produtos']);
          this.mensagemSalvar();
        });
    });

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

  deletarFotoBanco(id,nome_imagem){
    return new Promise(resolve => {
      
      let dados = {
        requisicao : 'excluir_foto',
        id : id, 
        nome_imagem : nome_imagem
        };
        console.log(dados);

        this.provider.dadosApi(dados, 'apiProdutos.php').subscribe(data => {
          this.obterFotos(this.idProduto);
        });
    });

  }


}

export interface Usuario {
  nome : String, 
  usuario : String, 
  senha : String, 
  nivel : String, 
  id : String, 
}
