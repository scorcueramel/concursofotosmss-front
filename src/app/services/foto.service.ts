import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Foto } from '../interfaces/foto';
import { Album } from '../interfaces/album';

@Injectable({
  providedIn: 'root'
})
export class FotoService {

  URL: string;
  URI: string;

  constructor(
    private httpClient: HttpClient
  ) {
    this.URL = environment.apiUrl;
    this.URI = 'fotos/'
  }

  getPhotoForBook(cabecera:Object, id:number):Observable<Foto[]>{
    return this.httpClient.get<Foto[]>(`${this.URL}${this.URI}getAllFotos/${id}`,cabecera);
  }

  getOnePhoto(cabecera:Object, id:number):Observable<Album>{
    return this.httpClient.get<Album>(`${this.URL}${this.URI}getOne/${id}`,cabecera);
  }

  publicateFoto(cabecera:Object, id:number):Observable<Foto>{
    return this.httpClient.get<Foto>(`${this.URL}${this.URI}publicate/${id}`,cabecera);
  }

  dePublicateFoto(cabecera:Object, id:number):Observable<Foto>{
    return this.httpClient.get<Foto>(`${this.URL}${this.URI}depublicate/${id}`,cabecera);
  }

  storeImage(cabecera:Object, formData:FormData):Observable<any>{
    return this.httpClient.post<any>(`${this.URL}${this.URI}procFile`,formData,cabecera );
  }

  registerFoto(cabecera:Object, foto:Foto):Observable<Foto>{
    return this.httpClient.post<Foto>(`${this.URL}${this.URI}create`,foto,cabecera);
  }
}
