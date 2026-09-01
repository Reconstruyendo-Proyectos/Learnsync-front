import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Topic } from './interfaces/topic-interfaces';
import { Page } from '../shared/page';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TopicApiService {

  httpClient = inject(HttpClient);
  baseUrl = `${environment.apiUrl}/topics`;

  getTopic(slug: string): Observable<Topic> {
    return this.httpClient.get<Topic>(`${this.baseUrl}/${slug}`);
  }

  getTopics(page: number = 0, size: number = 10): Observable<Page<Topic>> {
    const params = new HttpParams().set('page', page).set('size', size);
    return this.httpClient.get<Page<Topic>>(`${this.baseUrl}`, { params });
  }
}
