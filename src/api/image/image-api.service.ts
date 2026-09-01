import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface ImageResponse {
  url: string;
  deleteHash: string;
}

@Injectable({ providedIn: 'root' })
export class ImageApiService {
  httpClient = inject(HttpClient);
  baseUrl = `${environment.apiUrl}/images`;

  uploadImage(file: File): Observable<ImageResponse> {
    const formData = new FormData();
    formData.append('file', file);
    return this.httpClient.post<ImageResponse>(`${this.baseUrl}`, formData);
  }

  deleteImage(deleteHash: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.baseUrl}/${deleteHash}`);
  }
}
