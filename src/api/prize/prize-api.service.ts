import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Prize {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
}

@Injectable({ providedIn: 'root' })
export class PrizeApiService {
  httpClient = inject(HttpClient);
  baseUrl = `${environment.apiUrl}/prizes`;

  getPrizes(page = 0, size = 10): Observable<any> {
    const params = new HttpParams().set('page', page).set('size', size);
    return this.httpClient.get<any>(`${this.baseUrl}`, { params });
  }

  getPrize(id: number): Observable<Prize> {
    return this.httpClient.get<Prize>(`${this.baseUrl}/${id}`);
  }

  createPrize(data: Partial<Prize>): Observable<Prize> {
    return this.httpClient.post<Prize>(`${this.baseUrl}`, data);
  }

  updatePrize(id: number, data: Partial<Prize>): Observable<Prize> {
    return this.httpClient.put<Prize>(`${this.baseUrl}/${id}`, data);
  }

  deletePrize(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.baseUrl}/${id}`);
  }

  exchangePrize(id: number): Observable<any> {
    return this.httpClient.post<any>(`${this.baseUrl}/exchange/${id}`, {});
  }
}
