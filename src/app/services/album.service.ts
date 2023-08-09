import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Album } from '../interfaces/album';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {

  URL: string;
  URI: string;

  constructor(private httpCliet: HttpClient) {
    this.URL = environment.apiUrl;
    this.URI = 'albums/';
  }

  getAactivesAlbums(cabecera:Object):Observable<Album[]>{
    return this.httpCliet.get<Album[]>(`${this.URL}${this.URI}getAllAlbumsActives`,cabecera);
  }

  getInactivesAlbums(cabecera:Object):Observable<Album[]>{
    return this.httpCliet.get<Album[]>(`${this.URL}${this.URI}getAllAlbumsInactives`,cabecera);
  }

  getOneAlbum(cabecera:Object, id:any):Observable<Album>{
    return this.httpCliet.get<Album>(`${this.URL}${this.URI}getOne/${id}`,cabecera);
  }

  publicateAlbum(cabecera:Object,id:any):Observable<Album>{
    return this.httpCliet.get<Album>(`${this.URL}${this.URI}publicate/${id}`,cabecera);
  }

  dePublicateAlbum(cabecera:Object,id:any):Observable<Album>{
    return this.httpCliet.get<Album>(`${this.URL}${this.URI}depublicate/${id}`,cabecera);
  }

  storeImage(cabecera:Object, formData:FormData):Observable<any>{
    return this.httpCliet.post<any>(`${this.URL}${this.URI}procFile`,formData,cabecera);
  }

  registerAlbum(cabecera:Object, album:Album):Observable<Album>{
    return this.httpCliet.post<Album>(`${this.URL}${this.URI}create`,album,cabecera);
  }

  updateAlbum(cabecera:Object, album:Album,id:any):Observable<Album>{
    return this.httpCliet.post<Album>(`${this.URL}${this.URI}updateAlbum/${id}`,album,cabecera);
  }

  deleteAlbum(cabecera:Object, id:any):Observable<Object>{
    return this.httpCliet.post<Album>(`${this.URL}${this.URI}deleteAlbum/${id}`,null,cabecera);
  }

  getAlbumPublic():Observable<Album[]>{
    return this.httpCliet.get<Album[]>(`${this.URL}general/albumPublico`);
  }
}
