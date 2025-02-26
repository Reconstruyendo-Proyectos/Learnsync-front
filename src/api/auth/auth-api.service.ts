import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthRequestDTO, AuthResponseDTO } from './interfaces/auth-interfaces';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthApiService {
  
  private isAuthenticated = new BehaviorSubject<boolean>(false);
  isAuthenticated$ = this.isAuthenticated.asObservable();

  httpClient = inject(HttpClient);
  baseUrl = `${environment.urlBackend}/auth`;

  login(authRequest: AuthRequestDTO): Observable<any> {
    return this.httpClient.post<AuthResponseDTO>(`${this.baseUrl}/login/`, authRequest);
  }

  getUserByToken(token: string): Observable<any> {
    const params = new HttpParams().append('token', token);
    return this.httpClient.get<AuthResponseDTO>(`${this.baseUrl}/user-by-token/`, {
      params: params
    });
  }

  validateLogin(): void {
    this.isAuthenticated.next(true);
  }

  logout(): void {
    this.isAuthenticated.next(false);
  }
}