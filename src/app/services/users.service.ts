import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  URL: string = '';
  URI: string = '';

  constructor(
    private httpClient: HttpClient,
  ) {
    this.URL = environment.apiUrl;
    this.URI = 'users/'
  }

  getAllusers(cabecera:Object):Observable<User[]>{
    return this.httpClient.get<User[]>(`${this.URL}${this.URI}getAllUsers`,cabecera);
  }

  getOneUnser(cabecera:Object, id:any):Observable<User>{
    return this.httpClient.get<User>(`${this.URL}${this.URI}getOne/${id}`,cabecera);
  }

  updatedUser(cabecera:Object, id:number, user:User):Observable<User>{
    return this.httpClient.post<User>(`${this.URL}${this.URI}updateUser/${id}`,user,cabecera);
  }

  dropUser(cabecera:Object, id:any):Observable<Object>{
    return this.httpClient.post<Object>(`${this.URL}${this.URI}dropUser/${id}`,null,cabecera);
  }
}
