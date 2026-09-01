import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { StorageService } from '../../storage/storage.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const storageService = inject(StorageService);
  const token = storageService.getAuthData()?.token;

  if (token) {
    const request = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`),
    });
    return next(request);
  }
  return next(req);
};
