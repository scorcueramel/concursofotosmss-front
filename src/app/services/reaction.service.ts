import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class ReactionService {

  URL: string;
  URI: string;

  constructor(
    private httpClient: HttpClient
  ) {
    this.URL = environment.apiUrl;
    this.URI = 'general/'
  }

  reactions(idFoto:number, idReact:number,ipCliente:string):Observable<any>{
    return this.httpClient.get<any>(`${this.URL}${this.URI}reaccion/${idFoto}/${idReact}/${ipCliente}`);
  }

  reacctionsIp(ip:string):Observable<any[]>{
    return this.httpClient.get<any[]>(`${this.URL}${this.URI}reacciones/${ip}`);
  }

  getReactionsCount(id:number):Observable<any>{
    return this.httpClient.get<any>(`${this.URL}${this.URI}getReaccions/${id}`);
  }
}
