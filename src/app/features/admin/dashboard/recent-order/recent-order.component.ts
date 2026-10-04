import { Component, computed, effect, input } from '@angular/core';

import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { CommonModule } from '@angular/common';
import { Order } from '../dashboard.model';

@Component({
  selector: 'dashboard-recent-order',
  imports: [NzTableModule, NzTagModule, NzButtonModule, CommonModule],
  templateUrl: './recent-order.component.html',
  styleUrl: './recent-order.component.scss',
})
export class RecentOrderComponent {
  recentOrders = input.required<Order[]>();
  orders = computed(() => {
    return this.recentOrders();
  });

  formatDate(date: Date | string) {
    return new Date(date).toLocaleDateString('fa-IR');
  }
  readonly statusLabels: Record<string, string> = {
    pending: 'در انتظار',
    processing: 'در حال پردازش',
    shipped: 'ارسال شده',
    delivered: 'تحویل شده',
    cancelled: 'لغو شده',
  };
  readonly statusColors: Record<string, string> = {
    pending: 'gold',
    processing: 'blue',
    shipped: 'cyan',
    delivered: 'green',
    cancelled: 'red',
  };
  readonly paymentStatusLabels: Record<string, string> = {
    paid: 'پرداخت شده',
    pending: 'در انتظار پرداخت',
    failed: 'ناموفق',
    refunded: 'بازپرداخت شده',
  };

  readonly paymentStatusColors: Record<string, string> = {
    paid: 'green',
    pending: 'gold',
    failed: 'red',
    refunded: 'purple',
  };

  readonly paymentMethodLabels: Record<string, string> = {
    card: 'کارت',
    cash: 'نقدی',
    online: 'آنلاین',
  };

  viewOrder(order: Order): void {
    console.log('View order:', order);
  }
}
