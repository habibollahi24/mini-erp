import { CommonModule } from '@angular/common';
import { Component, input, TemplateRef } from '@angular/core';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';
import { StatCardTemplateContext, StatCardData } from './stats-card.model';

@Component({
  selector: 'dashboard-stats-card',
  imports: [NzGridModule, NzIconModule, NzStatisticModule, CommonModule],
  templateUrl: './stats-card.component.html',
  styleUrl: './stats-card.component.scss',
})
export class StatsCardComponent {
  // readonly template = input.required<TemplateRef<StatCardTemplateContext>>();

  readonly context = input.required<StatCardData>();
}
