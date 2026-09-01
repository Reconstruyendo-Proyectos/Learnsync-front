import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from './interfaces/category-interfaces';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryApiService {

  httpClient = inject(HttpClient);
  baseUrl = `${environment.apiUrl}/categories`;

  getCategories(page: number = 0, size: number = 10): Observable<any> {
    const params = new HttpParams().set('page', page).set('size', size);
    return this.httpClient.get<Category>(`${this.baseUrl}`, {
      params: params
    });
  }

  getCategoryById(id: number): Observable<Category> {
    return this.httpClient.get<Category>(`${this.baseUrl}/${id}`);
  }
}
