import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Thread } from './interfaces/thread-interfaces';

export type ThreadSortBy = 'creation-date' | 'interactions';

@Injectable({
  providedIn: 'root'
})
export class ThreadApiService {

  baseUrl = `${environment.apiUrl}/threads`;
  httpClient = inject(HttpClient);

  getThread(id: number): Observable<Thread> {
    return this.httpClient.get<Thread>(`${this.baseUrl}/${id}`);
  }

  listThreads(page: number = 0, size: number = 10, slug?: string, sortBy?: ThreadSortBy): Observable<any> {
    let params = new HttpParams().set('page', page).set('size', size);
    if (slug) params = params.set('slug', slug);
    if (sortBy) params = params.set('sortBy', sortBy);
    return this.httpClient.get<Thread[]>(`${this.baseUrl}`, { params });
  }
}
