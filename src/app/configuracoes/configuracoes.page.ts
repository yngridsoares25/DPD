import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-configuracoes',
  templateUrl: './configuracoes.page.html',
  styleUrls: ['./configuracoes.page.scss'],
})
export class ConfiguracoesPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  goToCategorias(){
    
    console.log("Agora eu vou para tela de categorias");
    this.router.navigate(['/categorias']);
  }
}
