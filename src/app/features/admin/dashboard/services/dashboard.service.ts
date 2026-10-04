import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { Activity, Order, SalesStat } from '../dashboard.model';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private readonly http = inject(HttpClient);

  private readonly apiUrl = 'http://localhost:3000';

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
