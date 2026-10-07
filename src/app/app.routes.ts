import { Routes } from '@angular/router';

import { AuthLayoutComponent } from './features/auth/layout/auth-layout.component';
import { ShopLayoutComponent } from './features/shop/layout/shop-layout.component';
import { AdminLayoutComponent } from './features/admin/layout/admin-layout.component';

import { AUTH_ROUTES } from './features/auth/auth.routes';
import { authGuard } from './core/auth/auth.guard';
import { ForbiddenComponent } from './components/forbidden/forbidden.component';
import { roleGuard } from './core/auth/role.guard';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'shop' },
  {
    path: 'shop',
    component: ShopLayoutComponent,
    loadChildren: () =>
      import('./features/shop/shop.routes').then((m) => m.SHOP_ROUTES),
  },
  {
    path: 'admin',
    canActivate: [authGuard, roleGuard],
    data: {
      roles: ['admin', 'manager'],
    },
    component: AdminLayoutComponent,
    loadChildren: () =>
      import('./features/admin/admin.routes').then((m) => m.ADMIN_ROUTES),
  },
  {
    path: 'auth',
    component: AuthLayoutComponent,
    children: AUTH_ROUTES,
  },
  {
    path: 'forbidden',
    component: ForbiddenComponent,
  },
];
