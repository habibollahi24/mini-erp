import { Routes } from '@angular/router';
import { DashboardPageComponent } from './dashboard/dashboard.page.component';

export const ADMIN_ROUTES: Routes = [
  { path: '', pathMatch: 'prefix', redirectTo: 'dashboard' },
  { path: 'dashboard', component: DashboardPageComponent },
];
