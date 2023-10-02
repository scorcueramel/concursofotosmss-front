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

  reactions(idFoto:number, idReact:number, tokenVoto:string):Observable<any>{
    return this.httpClient.get<any>(`${this.URL}${this.URI}reaccion/${idFoto}/${idReact}/${tokenVoto}`);
  }

  getReactionsCount(id:number):Observable<any>{
    return this.httpClient.get<any>(`${this.URL}${this.URI}getReaccions/${id}`);
  }

  getIpReacction():Observable<any>{
    return this.httpClient.get<any>(`${this.URL}${this.URI}getIpClient`);
  }
}
