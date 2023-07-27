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

  getAllAlbums(cabecera:Object):Observable<Album[]>{
    return this.httpCliet.get<Album[]>(`${this.URL}${this.URI}getAllAlbums`,cabecera);
  }

  processFile(cabecera:Object,portada:any):Observable<any>{
    const fd = new FormData();
    fd.append('portada',portada,portada.name)
    return this.httpCliet.post<any>(`${this.URL}${this.URI}procFile`,fd,cabecera);
  }

  registerAlbum(cabecera:Object, album:Album):Observable<Album>{
    return this.httpCliet.post<Album>(`${this.URL}${this.URI}create`,album,cabecera);
  }

  deleteAlbum(cabecera:Object, id:any):Observable<Object>{
    return this.httpCliet.post<Album>(`${this.URL}${this.URI}deleteAlbum/${id}`,null,cabecera);
  }
}
