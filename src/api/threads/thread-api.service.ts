import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Thread } from './interfaces/thread-interfaces';

@Injectable({
  providedIn: 'root'
})
export class ThreadApiService {

  baseUrl = `${environment.urlBackend}/thread`;
  httpClient = inject(HttpClient);

  listThreadsByCreationDate(): Observable<any> {
    return this.httpClient.get<Thread[]>(`${this.baseUrl}/list/creation-date/`);
  }
}
