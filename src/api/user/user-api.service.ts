import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { UserDTO } from './interfaces/user-interfaces';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UserApiService {

  httpClient = inject(HttpClient);
  baseUrl = `${environment.urlBackend}/user`;

  getUser(username: string): Observable<any> {
    return this.httpClient.get<UserDTO>(`${this.baseUrl}/get-user/${username}`);
  }
}
