import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Storage} from '@capacitor/core';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { ToastController } from '@ionic/angular';
import { Post } from 'src/services/post';
import { DataService } from '../data.service';
import { Pedido } from '../pedidos/pedido.interface';
import { PhotoService } from '../services/photo.service';

@Component({
  selector: 'app-add-pedido',
  templateUrl: './add-pedido.page.html',
  styleUrls: ['./add-pedido.page.scss'],
})
export class AddPedidoPage implements OnInit {
  //var pedido
  idPedido: string = "";
  idProduto:string="";
  qtProduto: string = "";
  data_inicial: string = "";
	data_final: string = "";
  idUsuarioComprador: string = "";
  idFornecedor: string = "";
  horario_entrega_1: string = "";
  horario_entrega_2: string = "";
  endereco: string = "";
  cidade: string = "";
  estado: string = "";
  cep: string = "";

  //var produto
  nomeProduto: string = "";
  idUsuario: string = "";
  categoria: string = "";
  valor: string = "";
  unidadeMedida: string = "";
  qtEstoque: string ="" ;
  qtMinimaPedido: string ="" ;
  back: string="";
  nivelUsuario: string = "";
  fotos:string [];


  dadosLogin: any;
  dt_atual: string ="" ;
  pedido: any ;


  customPickerOptions: { buttons: { text: string; handler: () => void; }[]; };
  constructor(private router: Router,private activatedRoute: ActivatedRoute,private provider: Post,private dataService: DataService,public toastController: ToastController, private storage: NativeStorage, public photoService: PhotoService) {

   }

  ngOnInit() {
    
    this.obterDadosUsuarioPhone();

      console.log(this.pedido);
    
    // this.activatedRoute.params.subscribe((data:any)=>{
    //   this.idProduto = data.id;
    //   this.nomeProduto = data.nomeProduto;
    //   this.categoria = data.categoria;
    //   this.valor = data.valor;
    //   this.idUsuario = data.idUsuario;
    //   this.unidadeMedida = data.unidadeMedida;
    //   this.qtMinimaPedido = data.qtMinimaPedido;
    //   this.qtEstoque = data.qtEstoque;
    //   this.idFornecedor= data.idUsuario;
    //   this.back="novo";
    // });
  
    this.dt_atual = this.dataHoje();

    this.activatedRoute.queryParams.subscribe(params => {
        let data = params;
        this.idPedido=data.idPedido;
        this.qtProduto=data.qtProduto;
        this.data_inicial=data.data_inicial;
        this.data_final=data.data_final;
        this.idUsuarioComprador=data.idUsuarioComprador;
        this.idFornecedor=data.idFornecedor;
        this.horario_entrega_1=data.horario_entrega_1;
        this.horario_entrega_2=data.horario_entrega_2;
        this.endereco=data.endereco;
        this.cidade=data.cidade;
        this.estado=data.estado;
        this.cep=data.cep;
      
        this.idProduto=data.idProduto;
        this.nomeProduto=data.nomeProduto;
        this.idUsuario=data.idUsuario;
        this.categoria=data.categoria;
        this.valor=data.valor;
        this.unidadeMedida=data.unidadeMedida;
        this.qtEstoque=data.qtEstoque;
        this.qtMinimaPedido=data.qtMinimaPedido;
        this.back="edidtar";
        console.log(data.idPedido);
        if(data.idPedido == undefined){
          this.back="novo";
        }
        this.obterFotos(data.idProduto)  
    });
  }

  produtos(){
    if(this.back == "novo"){
     this.router.navigate(['/produtos']);
    }else{
      this.router.navigate(['/pedidos']);
    }
  }


   dataHoje() {
    var data = new Date();
    var dia = data.getDate();
    var mes = data.getMonth() + 1;
    var ano = data.getFullYear();
    return [dia, mes, ano].join('/');
  }

  cadastrar(){
    return new Promise(resolve => {

      var entrega_1 = new Date(this.horario_entrega_1); 
     
      var entrega_2 = new Date(this.horario_entrega_1); 

      let dados = {
        requisicao : 'add',
        idProduto : this.idProduto, 
        qtProduto : this.qtProduto, 
        data_inicial : this.data_inicial, 
        data_final : this.data_final, 
        idUsuarioComprador : this.obterDadosStorage(), 
        idFornecedor : this.idFornecedor, 
        horario_entrega_1 : entrega_1.getHours() + ":" + entrega_1.getMinutes(),
        horario_entrega_2 : entrega_2.getHours() + ":" + entrega_2.getMinutes(),
        endereco : this.endereco,
        cidade : this.cidade,
        estado : this.estado,
        cep : this.cep,
        };

        this.provider.dadosApi(dados, 'apiPedidos.php').subscribe(data => {
          this.router.navigate(['/produtos']);
          this.mensagemSalvar();
        });
    });
  }

    obterDadosStorage() {

      this.dadosLogin =  Storage.get({ key: 'session_storage' });

      const obj  = JSON.parse(this.dadosLogin.__zone_symbol__value.value) || [];
      console.log(obj.id);
      return obj.id;
  


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
          
  }
  

  async mensagemSalvar() {
    const toast = await this.toastController.create({
      message: 'Salvo com Sucesso!!',
      duration: 1000
    });
    toast.present();
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
