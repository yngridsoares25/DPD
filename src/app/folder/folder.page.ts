import { ToastController } from '@ionic/angular';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Post } from 'src/services/post';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage  {

  public parametro: string;

  nivel: string;
  nome: string;
  dadosLogin: any;

  constructor(private router: Router, private provider: Post, private storage: NativeStorage, public toast: ToastController) { }

 

  ionViewWillEnter(){
    this.storage.getItem('session_storage').then((res)=>{
      this.dadosLogin = res;
      this.nome = this.dadosLogin.nome;
      this.nivel = this.dadosLogin.nivel;


    })

  }

  logout(){
    this.storage.clear();
    this.router.navigate(['/login']);
  }

}
