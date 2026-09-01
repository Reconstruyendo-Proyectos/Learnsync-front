import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject, isDevMode } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { StorageService } from '../../storage/storage.service';
import { AuthApiService } from '../auth-api.service';
import { NotificationService } from '../../../app/core/services/notification.service';

function extractMessage(error: HttpErrorResponse): string {
  const data = error.error;
  if (!data) return error.message || 'Error desconocido';
  if (typeof data === 'string') return data;
  if (typeof data.message === 'string') return data.message;
  if (typeof data.error === 'string') return data.error;
  return error.message || 'Error desconocido';
}

function devLog(...args: unknown[]) {
  if (isDevMode()) {
    console.error(...args);
  }
}

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const storageService = inject(StorageService);
  const authApiService = inject(AuthApiService);
  const notify = inject(NotificationService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      const status = error.status;
      const message = extractMessage(error);
      const retryAfter = error.headers?.get('Retry-After');

      switch (status) {
        case 0:
          notify.error('Sin conexión con el servidor. Verifica tu internet.');
          devLog('[0] Network error', req.url, error);
          break;

        case 400: {
          const msg = message || 'Solicitud inválida';
          if (msg.toLowerCase().includes('puntos insuficientes')) {
            notify.warning('Puntos insuficientes para canjear este premio.');
          } else if (msg.toLowerCase().includes('sortby')) {
            notify.warning(msg);
          } else {
            notify.warning(msg);
          }
          devLog('[400]', req.url, msg);
          break;
        }

        case 401: {
          notify.error(message || 'Sesión expirada. Inicia sesión nuevamente.');
          storageService.clearAuthData();
          storageService.clearLoginMethod();
          authApiService.logout();
          if (!router.url.includes('/login')) {
            router.navigate(['/login'], { queryParams: { reason: 'session_expired' } });
          }
          devLog('[401]', req.url, message);
          break;
        }

        case 403:
          notify.error(message || 'No tienes permisos para esta acción.');
          devLog('[403]', req.url, message);
          break;

        case 404: {
          const isNavigation = req.method === 'GET' && !req.url.includes('/api/');
          if (isNavigation) {
            router.navigate(['/not-found']);
          } else {
            notify.warning(message || 'Recurso no encontrado.');
          }
          devLog('[404]', req.url);
          break;
        }

        case 405:
          notify.error('Método no permitido.');
          devLog('[405]', req.url);
          break;

        case 409:
          notify.warning(message || 'Conflicto: el recurso ya existe o ya fue canjeado.');
          devLog('[409]', req.url, message);
          break;

        case 429: {
          const seconds = retryAfter ? parseInt(retryAfter, 10) : 60;
          const wait = Number.isFinite(seconds) ? seconds : 60;
          notify.error(`Demasiados intentos. Espera ${wait}s antes de reintentar.`, 7000);
          devLog('[429] Rate limit', req.url, `Retry-After: ${wait}s`);
          break;
        }

        case 500:
        case 502:
        case 503:
          notify.error('Error interno del servidor. Intenta más tarde.');
          devLog(`[${status}]`, req.url, message);
          break;

        default:
          notify.error(message || 'Ocurrió un error inesperado.');
          devLog(`[${status}]`, req.url, message);
          break;
      }

      return throwError(() => error);
    })
  );
};
