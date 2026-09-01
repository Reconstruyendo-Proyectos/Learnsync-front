import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { StorageService } from '../../../api/storage/storage.service';

export const authGuard: CanActivateFn = () => {
  const storage = inject(StorageService);
  const router = inject(Router);
  const token = storage.getAuthData()?.token;
  if (token) return true;
  router.navigate(['/login'], { queryParams: { reason: 'auth_required' } });
  return false;
};

export const guestGuard: CanActivateFn = () => {
  const storage = inject(StorageService);
  const router = inject(Router);
  const token = storage.getAuthData()?.token;
  if (!token) return true;
  router.navigate(['/']);
  return false;
};
