import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Storage} from '@capacitor/core';
import { ToastController } from '@ionic/angular';
import { Post } from 'src/services/post';
import { DataService } from '../data.service';
import { Pedido } from '../pedidos/pedido.interface';

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

  dadosLogin: any;
  dt_atual: string ="" ;
  pedido: any ;


  customPickerOptions: { buttons: { text: string; handler: () => void; }[]; };
  constructor(private router: Router,private activatedRoute: ActivatedRoute,private provider: Post,private dataService: DataService,public toastController: ToastController) {

   }

  ngOnInit() {
    


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


      let dados = {
        requisicao : 'add',
        idProduto : this.idProduto, 
        qtProduto : this.qtProduto, 
        data_inicial : this.data_inicial, 
        data_final : this.data_final, 
        idUsuarioComprador : this.obterDadosStorage(), 
        idFornecedor : this.idFornecedor, 
        horario_entrega_1 : this.horario_entrega_1,
        horario_entrega_2 : this.horario_entrega_2,
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

  async mensagemSalvar() {
    const toast = await this.toastController.create({
      message: 'Salvo com Sucesso!!',
      duration: 1000
    });
    toast.present();
  }

}
