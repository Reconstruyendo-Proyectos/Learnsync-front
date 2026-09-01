import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { UserDTO } from './interfaces/user-interfaces';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserApiService {

  httpClient = inject(HttpClient);
  baseUrl = `${environment.apiUrl}/users`;

  getAuthenticatedUser(): Observable<UserDTO> {
    return this.httpClient.get<UserDTO>(`${this.baseUrl}/profile`);
  }

  updateUsername(username: string): Observable<UserDTO> {
    const params = new HttpParams().set('username', username);
    return this.httpClient.patch<UserDTO>(`${this.baseUrl}/username`, {}, { params });
  }

  updatePhoto(photoUrl: string): Observable<UserDTO> {
    return this.httpClient.patch<UserDTO>(`${this.baseUrl}/photo`, { photoUrl });
  }

  deletePhoto(): Observable<void> {
    return this.httpClient.delete<void>(`${this.baseUrl}/photo`);
  }
}
