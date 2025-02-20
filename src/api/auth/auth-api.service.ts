import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthResponseDTO } from './interfaces/auth-interfaces';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthApiService {

  httpClient = inject(HttpClient);
  baseUrl = `${environment.urlBackend}/auth`;

  getUserByToken(token: string): Observable<any> {
    const params = new HttpParams().append('token', token);
    return this.httpClient.get<AuthResponseDTO>(`${this.baseUrl}/user-by-token/`, {
      params: params
    });
  }
}