import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Comment } from './interfaces/comments-interface';
import { Page } from '../shared/page';

@Injectable({ providedIn: 'root' })
export class CommentApiService {
  httpClient = inject(HttpClient);
  baseUrl = `${environment.apiUrl}/comments`;

  getComments(page = 0, size = 10): Observable<Page<Comment>> {
    const params = new HttpParams().set('page', page).set('size', size);
    return this.httpClient.get<Page<Comment>>(`${this.baseUrl}`, { params });
  }

  getCommentsByThread(threadId: number, page = 0, size = 10): Observable<Page<Comment>> {
    const params = new HttpParams().set('page', page).set('size', size).set('threadId', threadId);
    return this.httpClient.get<Page<Comment>>(`${this.baseUrl}`, { params });
  }

  createComment(threadId: number, message: string): Observable<Comment> {
    return this.httpClient.post<Comment>(`${this.baseUrl}`, { threadId, message });
  }
}
