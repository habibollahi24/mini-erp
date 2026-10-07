import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../../../environment/environment';

import { Activity, Order, SalesStat } from '../dashboard.model';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private readonly http = inject(HttpClient);

  apiUrl = environment.apiUrl;

  getSalesStats() {
    return this.http.get<SalesStat[]>(`${this.apiUrl}/salesStats`);
  }

  getOrders() {
    return this.http.get<Order[]>(`${this.apiUrl}/orders`);
  }

  getActivities() {
    return this.http.get<Activity[]>(`${this.apiUrl}/activities`);
  }
}
