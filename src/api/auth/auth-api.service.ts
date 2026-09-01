import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthRequestDTO, AuthResponseDTO, GoogleTokenRequestDTO, RegisterRequestDTO } from './interfaces/auth-interfaces';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthApiService {

  private isAuthenticated = new BehaviorSubject<boolean>(false);
  isAuthenticated$ = this.isAuthenticated.asObservable();

  httpClient = inject(HttpClient);
  baseUrl = `${environment.apiUrl}/auth`;

  login(authRequest: AuthRequestDTO): Observable<AuthResponseDTO> {
    return this.httpClient.post<AuthResponseDTO>(`${this.baseUrl}/login`, authRequest);
  }

  register(registerRequest: RegisterRequestDTO): Observable<void> {
    return this.httpClient.post<void>(`${this.baseUrl}/register`, registerRequest);
  }

  confirmToken(token: string): Observable<void> {
    return this.httpClient.get<void>(`${this.baseUrl}/confirmation-token/${token}`);
  }

  loginWithGoogle(idToken: string): Observable<AuthResponseDTO> {
    const body: GoogleTokenRequestDTO = { idToken };
    return this.httpClient.post<AuthResponseDTO>(`${this.baseUrl}/google`, body);
  }

  validateLogin(): void {
    this.isAuthenticated.next(true);
  }

  logout(): void {
    this.isAuthenticated.next(false);
  }
}