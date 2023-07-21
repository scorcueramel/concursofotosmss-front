import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../interfaces/user';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  URL: string = '';
  URI: string = '';

  constructor(
    private httpClient: HttpClient,
    private _jwtHelper: JwtHelperService
  ) {
    this.URL = environment.apiUrl;
    this.URI = 'auth/';
  }

  registerUser(user:Object,cabecera:Object):Observable<Object>{
    return this.httpClient.post<Object>(`${this.URL}${this.URI}register`,user,cabecera);
  }

  authLogin(usuario: User): Observable<User> {
    return this.httpClient.post<User>(`${this.URL}${this.URI}login`, usuario);
  }

  authLogOut(cabecera:Object): Observable<Object> {
    return this.httpClient.post<Object>(`${this.URL}${this.URI}logout`, null, cabecera);
  }

  isAuth(): boolean {
    const token = localStorage.getItem('token');
    if (this._jwtHelper.isTokenExpired(token) || localStorage.getItem('toke')) {
      return false;
    }
    return true;
  }

  isAdmin():boolean{
    if(localStorage.getItem('rol') == 'Colaborador'){
      return true;
    }else
    {
      return false;
    }
  }
}
