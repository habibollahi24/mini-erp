import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';

import {
  BehaviorSubject,
  catchError,
  filter,
  finalize,
  switchMap,
  take,
  throwError,
} from 'rxjs';
import { AuthService } from '../../features/auth/services/auth.service';
import { AuthStore } from '../../store/auth.store';

let refreshInProgress = false;
const refreshTokenSubject = new BehaviorSubject<string | null>(null);

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authStore = inject(AuthStore);
  const authService = inject(AuthService);

  const exceptionUrlForAccessToken = [
    '/auth/login',
    '/auth/register',
    '/auth/refresh',
    '/auth/logout',
  ];

  if (exceptionUrlForAccessToken.includes(req.url)) {
    return next(req);
  }

  const accessToken = authStore.accessToken();

  if (!accessToken) {
    return next(req);
  }

  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status !== 401) {
        return throwError(() => error);
      }

      // Refresh در حال انجام است
      if (refreshInProgress) {
        return refreshTokenSubject.pipe(
          filter((token) => token !== null),
          take(1),
          switchMap((token) => {
            const retryReq = req.clone({
              setHeaders: {
                Authorization: `Bearer ${token}`,
              },
            });

            return next(retryReq);
          }),
        );
      }

      // اولین Request که 401 گرفته
      refreshInProgress = true;
      refreshTokenSubject.next(null);

      return authService.refresh().pipe(
        switchMap(({ accessToken }) => {
          authStore.setAccessToken(accessToken);

          refreshTokenSubject.next(accessToken);

          const retryReq = req.clone({
            setHeaders: {
              Authorization: `Bearer ${accessToken}`,
            },
          });

          return next(retryReq);
        }),

        catchError((refreshError) => {
          authStore.clearAuth();

          refreshTokenSubject.next(null);

          return throwError(() => refreshError);
        }),

        finalize(() => {
          refreshInProgress = false;
        }),
      );
    }),
  );
};
