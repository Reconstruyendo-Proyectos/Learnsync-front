import { Injectable } from '@angular/core';
import { AuthResponseDTO } from '../auth/interfaces/auth-interfaces';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  authKey = environment.authKey;

  setAuthData(data: AuthResponseDTO): void {
    localStorage.setItem(this.authKey, JSON.stringify(data));
  }

  setLoginMethod(data: string): void {
    localStorage.setItem('loginMethod', data);
  }

  getLoginMethod(): string | null {
    return localStorage.getItem('loginMethod');
  }

  getAuthData(): AuthResponseDTO | null {
    const data = localStorage.getItem(this.authKey);
      return data ? (JSON.parse(data) as AuthResponseDTO) : null;
  }

  clearAuthData(): void {
    localStorage.removeItem(this.authKey);
  }
}
