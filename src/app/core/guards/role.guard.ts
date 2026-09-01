import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { StorageService } from '../../../api/storage/storage.service';
import { UserApiService } from '../../../api/user/user-api.service';
import { NotificationService } from '../services/notification.service';
import { catchError, map, of } from 'rxjs';

export const roleGuard = (allowed: string[]): CanActivateFn => {
  return () => {
    const storage = inject(StorageService);
    const userApi = inject(UserApiService);
    const router = inject(Router);
    const notify = inject(NotificationService);

    const token = storage.getAuthData()?.token;
    if (!token) {
      router.navigate(['/login'], { queryParams: { reason: 'auth_required' } });
      return false;
    }

    return userApi.getAuthenticatedUser().pipe(
      map((user) => {
        const role = user?.role?.roleName;
        if (role && allowed.includes(role)) return true;
        notify.warning('No tienes permisos para acceder.');
        router.navigate(['/']);
        return false;
      }),
      catchError(() => {
        storage.clearAuthData();
        storage.clearLoginMethod();
        router.navigate(['/login'], { queryParams: { reason: 'session_expired' } });
        return of(false);
      })
    );
  };
};
