import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthApiService } from './authapi.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BikeApiService {

  constructor(private http: HttpClient, private authApi: AuthApiService) { }

  addBike(data: any): Observable<any> {
    const url = '/api/bikes'; 
    return this.http.post(url, data, { headers: this.makeHeader() });
  }

  getBikes(): Observable<any> {
    const url = '/api/bikes'; 
    return this.http.get(url, { headers: this.makeHeader() });
  }

  private makeHeader(): HttpHeaders {
    const token = this.authApi.getToken();
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }
}

