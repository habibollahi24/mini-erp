import { computed, inject } from '@angular/core';
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import {
  catchError,
  Observable,
  of,
  pipe,
  switchMap,
  tap,
  throwError,
  timeout,
} from 'rxjs';
import { tapResponse } from '@ngrx/operators';
import {
  AuthResponse,
  LoginDto,
  MeResponse,
  RegisterDto,
  User,
} from '../features/auth/auth.model';
import { AuthService } from '../features/auth/services/auth.service';

interface AuthState {
  user: User | null;
  accessToken: string | null;
  loading: boolean;
  error: string | null;
  authBootstrapFlashPassed: boolean;
}

export const AuthStore = signalStore(
  { providedIn: 'root' },

  withState<AuthState>({
    user: null,
    accessToken: null,
    loading: false,
    error: null,
    authBootstrapFlashPassed: false, //هنوز نمیدانیم کاربر لاگین کرده یا نه و الان تازه موقعیه که هنوز لود نشه اپلیکیشن و به طبع استور
  }),

  withComputed(({ user }) => ({
    isAuthenticated: computed(() => user() !== null),
  })),

  withMethods((store, authService = inject(AuthService)) => ({
    setAccessToken(accessToken: string) {
      patchState(store, {
        accessToken,
      });
    },

    clearAuth() {
      patchState(store, {
        user: null,
        accessToken: null,
        error: null,
      });
    },

    login$(credentials: LoginDto) {
      patchState(store, {
        loading: true,
        error: null,
      });
      return authService.login(credentials).pipe(
        tap((response) =>
          patchState(store, {
            user: response.user,
            accessToken: response.accessToken,
            loading: false,
            error: null,
          }),
        ),
        catchError((error: { error: { message: string } }) => {
          patchState(store, {
            loading: false,
            error: error?.error?.message ?? 'Login failed',
          });
          return throwError(() => error);
        }),
      );
    },

    register: rxMethod<RegisterDto>(
      pipe(
        tap(() => {
          patchState(store, {
            loading: true,
            error: null,
          });
        }),

        switchMap((data) =>
          authService.register(data).pipe(
            tapResponse({
              next: (response: AuthResponse) => {
                patchState(store, {
                  user: response.user,
                  accessToken: response.accessToken,
                  loading: false,
                  error: null,
                });
              },

              error: (error: { error: { message: string } }) => {
                patchState(store, {
                  loading: false,
                  error: error?.error?.message ?? 'Registration failed',
                });
              },
            }),
          ),
        ),
      ),
    ),

    logout$() {
      patchState(store, {
        loading: true,
        error: null,
      });

      return authService.logout().pipe(
        tap(() =>
          patchState(store, {
            user: null,
            accessToken: null,
            loading: false,
            error: null,
          }),
        ),
        catchError((error) => {
          patchState(store, {
            user: null,
            accessToken: null,
            loading: false,
          });
          return throwError(() => error);
        }),
      );
    },

    initialize$(): Observable<MeResponse> {
      return authService.refresh().pipe(
        // delay(25000),
        tap(({ accessToken }) => {
          patchState(store, {
            accessToken,
          });
        }),

        switchMap(({ accessToken }) => authService.me()),
        timeout(20000),
        tap(({ user }) => {
          patchState(store, {
            user,
            loading: false,
            authBootstrapFlashPassed: true,
            error: null,
          });
        }),
        catchError((e) => {
          patchState(store, {
            user: null,
            accessToken: null,
            loading: false,
            authBootstrapFlashPassed: true,
            error: null,
          });
          return of({} as { user: User });
        }),
      );
    },
  })),
);
