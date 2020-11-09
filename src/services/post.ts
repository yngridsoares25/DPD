import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pedido } from './pedido.interface';
import 'rxjs/add/operator/map';
//431920851633-ml8k7glksacub0ko888j59k1eac2fut7.apps.googleusercontent.com
//wvq5jfOYCR1eKjAjh6KYOxFA

@Injectable()
export class Post{
    server: string = 'http://marcoduarte.cf/api/';
    //server = 'http://localHost/apiionic/';
    constructor(private http : HttpClient){
       
    }


     dadosApi(dados: any, api: string){
            const httpOptions = {
                headers: new HttpHeaders({'Content-Type' : 'application/json'})
                }

            let url = this.server + api;
            return this.http.post(url, JSON.stringify(dados), httpOptions).map(res => res);
        }

        dadosApiObject(dados: any, api: string, pedido:Pedido[]){
            const httpOptions = {
                headers: new HttpHeaders({'Content-Type' : 'application/json'})
                }

            let url = this.server + api;
            return this.http.post(url, JSON.stringify(dados), httpOptions).map(res => pedido);
        }
}
