import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzCardModule } from 'ng-zorro-antd/card';
import { StatsCardComponent } from './stats-card/stats-card.component';

import { DashboardService } from './services/dashboard.service';
import { CommonModule } from '@angular/common';
import { SalesChartComponent } from './sales-chart/sales-chart.component';
import { OrderStatusChartComponent } from './order-status-chart/order-status-chart.component';
import { RecentOrderComponent } from './recent-order/recent-order.component';
import { RecentActivitiesComponent } from './recent-activities/recent-activities.component';

export interface StatCardData {
  title: string;
  value: number;
  description: string;
  icon: string;
  background: string;
}

@Component({
  selector: 'admin-dashboard',
  imports: [
    NzButtonModule,
    NzIconModule,
    NzInputModule,
    StatsCardComponent,
    NzGridModule,
    NzCardModule,
    CommonModule,
    SalesChartComponent,
    OrderStatusChartComponent,
    RecentOrderComponent,
    RecentActivitiesComponent,
  ],
  templateUrl: './dashboard.page.component.html',
  styleUrl: './dashboard.page.component.scss',
})
export class DashboardPageComponent {
  private readonly dashboardService = inject(DashboardService);

  readonly salesStats = toSignal(this.dashboardService.getSalesStats(), {
    initialValue: [],
  });
  readonly orders = toSignal(this.dashboardService.getOrders(), {
    initialValue: [],
  });
  readonly activities = toSignal(this.dashboardService.getActivities(), {
    initialValue: [],
  });

  today = new Intl.DateTimeFormat('fa-IR', {
    dateStyle: 'full',
  }).format();

  // For StatsCard Component
  readonly totalRevenue = computed(() =>
    this.salesStats().reduce((sum, item) => sum + item.revenue, 0),
  );

  readonly totalOrders = computed(() =>
    this.salesStats().reduce((sum, item) => sum + item.orders, 0),
  );

  readonly totalCustomers = computed(() =>
    this.salesStats().reduce((sum, item) => sum + item.customers, 0),
  );

  readonly averageOrderValue = computed(() =>
    this.salesStats().reduce((sum, item) => sum + item.averageOrderValue, 0),
  );

  readonly statCards = computed<StatCardData[]>(() => [
    {
      title: ' تومان ',
      value: this.totalRevenue(),
      description: 'مجموع درآمد این دوره',
      icon: 'dollar',
      background: '#eef2ff',
    },
    {
      title: ' سفارش ',
      value: this.totalOrders(),
      description: 'تعداد سفارش‌های ثبت شده',
      icon: 'shopping-cart',
      background: '#ecfdf5',
    },
    {
      title: ' مشتری ',
      value: this.totalCustomers(),
      description: 'تعداد مشتریان فعال',
      icon: 'team',
      background: '#fff7ed',
    },
    {
      title: ' تومان ',
      value: this.averageOrderValue() / 6,
      description: 'میانگین مبلغ هر سفارش',
      icon: 'bar-chart',
      background: '#fdf2f8',
    },
  ]);

  // For Chart Component
  readonly salesChartData = computed(() =>
    this.salesStats().map((item) => ({
      month: item.month,
      revenue: item.revenue,
      orders: item.orders,
    })),
  );
  // For OrderStatus Chart
  readonly orderStatusData = computed(() => {
    const orders = this.orders();

    return [
      {
        name: 'در انتظار',
        value: orders.filter((order) => order.status === 'pending').length,
      },
      {
        name: 'در حال پردازش',
        value: orders.filter((order) => order.status === 'processing').length,
      },
      {
        name: 'ارسال شده',
        value: orders.filter((order) => order.status === 'delivered').length,
      },
      {
        name: 'لغو شده',
        value: orders.filter((order) => order.status === 'cancelled').length,
      },
      {
        name: ' در حال ارسال',
        value: orders.filter((order) => order.status === 'shipped').length,
      },
    ];
  });

  //For Recent  Order Table
  readonly recentOrders = computed(() =>
    [...this.orders()]
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      )
      .slice(0, 5),
  );

  //For Recent Activities
  readonly recentActivities = computed(() =>
    [...this.activities()]
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      )
      .slice(0, 5),
  );
}
