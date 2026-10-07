import { CanActivateFn, ActivatedRouteSnapshot, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthStore } from './auth.store';

export const roleGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const authStore = inject(AuthStore);
  const router = inject(Router);

  const user = authStore.user();

  if (!user) {
    return router.createUrlTree(['/auth']);
  }

  const allowedRoles = route.data['roles'] as string[] | undefined;

  if (!allowedRoles) {
    return true;
  }

  if (allowedRoles.includes(user.role)) {
    return true;
  }

  return router.createUrlTree(['/forbidden']);
};
