import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FinalistasService {

  URL: string;
  URI: string;

  constructor(
    private httpClient: HttpClient
  ) {
    this.URL = environment.apiUrl;
    this.URI = 'general/'
  }

  getTopFinalist():Observable<any>{
    return this.httpClient.get<any>(`${this.URL}${this.URI}getFinalists`);
  }
}
