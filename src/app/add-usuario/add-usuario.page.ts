import { Post } from './../../services/post';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-add-usuario',
  templateUrl: './add-usuario.page.html',
  styleUrls: ['./add-usuario.page.scss'],
})
export class AddUsuarioPage implements OnInit {

  nome: string = "";
  usuario: string = "";
  senha: string = "";
  nivel: string = "";
  id: string = "";
  urlVoltar: string="";

  // tslint:disable-next-line: max-line-length
  constructor(private actRouter: ActivatedRoute, private router: Router, private provider: Post, public toastController: ToastController) { }

  ngOnInit() {
    this.actRouter.params.subscribe((data:any)=>{
      this.id = data.id;
      this.nome = data.nome;
      this.usuario = data.usuario;
      this.senha = data.senha;
      this.nivel = data.nivel;

      console.log(data.urlVoltar);
      if(data.urlVoltar == undefined){
        this.urlVoltar = "usuarios";
      }else{
        this.urlVoltar = 'login';
      }
    });
  }

  mostrarNoLog(){
      console.log(this.nome);


  }

  async mensagemSalvar() {
    const toast = await this.toastController.create({
      message: 'Salvo com Sucesso!!',
      duration: 1000
    });
    toast.present();
  }

  Usuarios(){
    this.router.navigate(['/usuarios']);
  }

  cadastrar(){
    return new Promise(resolve => {
      
      let dados = {
        requisicao : 'add',
        nome : this.nome, 
        usuario : this.usuario, 
        senha : this.senha, 
        nivel : this.nivel, 
        };

        this.provider.dadosApi(dados, 'apiUsuarios.php').subscribe(data => {
          this.router.navigate(['/'+ this.urlVoltar]);
          this.mensagemSalvar();
        });
    });
  }

  editar(){
    return new Promise(resolve => {
      
      let dados = {
        requisicao : 'editar',
        nome : this.nome, 
        usuario : this.usuario, 
        senha : this.senha, 
        nivel : this.nivel, 
        id : this.id, 
        };

        this.provider.dadosApi(dados, 'apiUsuarios.php').subscribe(data => {
          this.router.navigate(['/usuarios']);
          this.mensagemSalvar();
        });
    });
  }

}
