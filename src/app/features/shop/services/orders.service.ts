import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../../environment/environment';

export interface Order {
  id: number;
  customerId: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  shippingStatus: 'pending' | 'shipped' | 'delivered';
  total: number;
  itemsCount: number;
  trackingNumber?: string;
  createdAt: string;
}

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private readonly http = inject(HttpClient);

  getCustomerOrders(customerId: number) {
    return this.http.get<Order[]>(`${environment.apiUrl}/orders`, {
      params: {
        customerId,
        _sort: 'createdAt',
        _order: 'desc',
      },
    });
  }
}
