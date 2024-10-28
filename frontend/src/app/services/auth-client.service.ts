import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthClientService {
  private apiUrl = 'http://localhost:4200/auth';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    console.log('Tentando login com:', { email, password });
    return this.http.post(`${this.apiUrl}/login`, { email, password });
  }

  setUserData(userData: any): void {
    localStorage.setItem('user', JSON.stringify(userData));
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('user');
  }

  logout(): void {
    localStorage.removeItem('user');
  }
}