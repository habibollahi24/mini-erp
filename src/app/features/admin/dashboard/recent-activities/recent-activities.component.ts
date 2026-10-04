import { Component, computed, input } from '@angular/core';
import { Activity } from '../dashboard.model';

import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'dashboard-recent-activities',
  imports: [NzEmptyModule, NzIconModule, NzSpinModule, CommonModule],
  templateUrl: './recent-activities.component.html',
  styleUrl: './recent-activities.component.scss',
})
export class RecentActivitiesComponent {
  recentActivities = input.required<Activity[]>();
  activities = computed(() => this.recentActivities());

  readonly activityMeta: Record<
    string,
    {
      icon: string;
      color: string;
      background: string;
    }
  > = {
    'order.created': {
      icon: 'shopping-cart',
      color: '#1677ff',
      background: '#e6f4ff',
    },

    'product.updated': {
      icon: 'edit',
      color: '#722ed1',
      background: '#f9f0ff',
    },

    'customer.updated': {
      icon: 'user-add',
      color: '#52c41a',
      background: '#f6ffed',
    },
  };

  getActivityMeta(type: string) {
    return (
      this.activityMeta[type] ?? {
        icon: 'bell',
        color: '#8c8c8c',
        background: '#f5f5f5',
      }
    );
  }

  formatDate(date: string): string {
    return new Intl.DateTimeFormat('fa-IR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(date));
  }
}
