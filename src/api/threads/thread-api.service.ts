import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Thread } from './interfaces/thread-interfaces';

@Injectable({
  providedIn: 'root'
})
export class ThreadApiService {

  baseUrl = `${environment.urlBackend}/thread`;
  httpClient = inject(HttpClient);

  getThread(id: number): Observable<any> {
    return this.httpClient.get<Thread>(`${this.baseUrl}/${id}`);
  }

  listThreads(page: number): Observable<any> {
    const params = new HttpParams().append('page', page);
    return this.httpClient.get<Thread[]>(`${this.baseUrl}/list/`, {
      params: params
    });
  }

  listThreadsByCreationDate(slug: string, page: number): Observable<any> {
    const params = new HttpParams().append('page', page);
    return this.httpClient.get<Thread[]>(`${this.baseUrl}/list/creation-date/${slug}`, {
      params: params
    });
  }

  listThreadsByInteractions(page: number): Observable<any> {
    const params = new HttpParams().append('page', page);
    return this.httpClient.get<Thread[]>(`${this.baseUrl}/list/interactions/`, {
      params: params
    });
  }
}
