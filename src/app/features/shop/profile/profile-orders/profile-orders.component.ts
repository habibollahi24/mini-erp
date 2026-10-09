import { Component, inject } from '@angular/core';
import { Order, OrderService } from '../../services/orders.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { CommonModule } from '@angular/common';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { AuthStore } from '../../../../store/auth.store';

@Component({
  selector: 'shop-profile-orders',
  imports: [
    NzCardModule,
    NzTagModule,
    NzSkeletonModule,
    NzEmptyModule,
    NzIconModule,
    NzDividerModule,
    CommonModule,
    NzButtonModule,
  ],
  templateUrl: './profile-orders.component.html',
  styleUrl: './profile-orders.component.scss',
})
export class ProfileOrdersComponent {
  private readonly orderService = inject(OrderService);
  private readonly authStore = inject(AuthStore);

  readonly user = this.authStore.user;

  readonly orders = rxResource({
    params: () => ({
      customerId: this.user()?.id,
    }),

    stream: ({ params }) => {
      if (!params.customerId) {
        return of([]);
      }

      return this.orderService.getCustomerOrders(params.customerId);
    },
  });

  getOrderStatusColor(status: Order['status']): string {
    const colors: Record<Order['status'], string> = {
      pending: 'warning',
      processing: 'processing',
      shipped: 'blue',
      delivered: 'success',
      cancelled: 'error',
    };

    return colors[status];
  }
  getOrderStatusLabel(status: Order['status']): string {
    const labels: Record<Order['status'], string> = {
      pending: 'در انتظار',
      processing: 'در حال پردازش',
      shipped: 'ارسال شده',
      delivered: 'تحویل شده',
      cancelled: 'لغو شده',
    };

    return labels[status];
  }
}
