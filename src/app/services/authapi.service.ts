import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthApiService {
  private apiUrl = 'http://localhost:8000/api';
  private token: string | null = null;

  constructor(private http: HttpClient) {}

  register(data: any): Observable<any> {
    const url = `${this.apiUrl}/register`;
    return this.http.post(url, data);
  }

  login(data: any): Observable<any> {
    if (data.name === 'macska' && data.password === 'egér') { 
      const mockToken = 'mock-token';
      this.storeToken(mockToken);
      return of({ token: mockToken });
    } else {
      return new Observable(observer => {
        observer.error({ message: 'Invalid credentials' });
      });
    }
  }

  storeToken(token: string): void {
    this.token = token;
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return this.token || localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return this.getToken() !== null;
  }

  getAuthHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }
}





