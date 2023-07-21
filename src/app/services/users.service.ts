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

  dropUser(cabecera:Object, id:any):Observable<Object>{
    return this.httpClient.post<Object>(`${this.URL}${this.URI}dropUser/${id}`,null,cabecera);
  }
}
