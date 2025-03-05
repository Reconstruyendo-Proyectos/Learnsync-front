import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Topic } from './interfaces/topic-interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TopicApiService {

  httpClient = inject(HttpClient);
  baseUrl = `${environment.urlBackend}/topic`;

  getTopic(slug: string): Observable<any> {
    return this.httpClient.get<Topic>(`${this.baseUrl}/${slug}`);
  }
}
