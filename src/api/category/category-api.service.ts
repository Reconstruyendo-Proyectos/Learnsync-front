import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from './interfaces/category-interfaces';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CategoryApiService {

  httpClient = inject(HttpClient);
  baseUrl = `${environment.urlBackend}/category`;

  getCategories(page: number): Observable<any> {
    const params = new HttpParams().append('page', page);
    return this.httpClient.get<Category>(`${this.baseUrl}/list/`, {
      params: params
    });
  }
}
