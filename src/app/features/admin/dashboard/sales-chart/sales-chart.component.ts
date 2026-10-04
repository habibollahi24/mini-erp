import { Component, computed, input } from '@angular/core';

import { NgxEchartsDirective, provideEchartsCore } from 'ngx-echarts';
import * as echarts from 'echarts/core';
import { BarChart, LineChart } from 'echarts/charts';
import {
  GridComponent,
  TooltipComponent,
  LegendComponent,
} from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import { type EChartsOption } from 'echarts/types/dist/shared';
echarts.use([
  BarChart,
  GridComponent,
  CanvasRenderer,
  TooltipComponent,
  LineChart,
  LegendComponent,
]);

@Component({
  selector: 'dashboard-sales-chart',
  imports: [NgxEchartsDirective],
  providers: [provideEchartsCore({ echarts })],

  templateUrl: './sales-chart.component.html',
  styleUrl: './sales-chart.component.scss',
})
export class SalesChartComponent {
  readonly salesChartData = input.required<
    {
      month: string;
      revenue: number;
      orders: number;
    }[]
  >();

  readonly chartOptions = computed<EChartsOption>(() => {
    const data = this.salesChartData();
    return {
      tooltip: {
        trigger: 'axis',

        axisPointer: {
          type: 'none',
        },

        formatter: (params: any) => {
          return params
            .map((item: any) => {
              if (item.seriesName === 'فروش') {
                return `${item.marker} ${item.seriesName}: ${item.value.toLocaleString()} تومان`;
              }

              return `${item.marker} ${item.seriesName}: ${item.value} سفارش`;
            })
            .join('<br>');
        },
      },

      legend: {
        show: true,
        top: 0,
        left: 'center',
      },

      xAxis: {
        type: 'category',
        data: data.map((item) => item.month),

        axisTick: {
          show: false,
        },

        axisLine: {
          show: false,
        },
      },

      yAxis: [
        {
          type: 'value',

          splitLine: {
            lineStyle: {
              type: 'dashed',
            },
          },
        },

        {
          type: 'value',

          splitLine: {
            show: false,
          },
        },
      ],

      series: [
        {
          name: 'سفارش‌ها',
          type: 'bar',
          yAxisIndex: 0,
          color: '#ffd230',
          data: data.map((item) => item.orders),

          barMaxWidth: 50,

          itemStyle: {
            borderRadius: [6, 6, 0, 0],
          },

          emphasis: {
            focus: 'series',
          },
        },
        {
          name: 'فروش',
          type: 'bar',
          yAxisIndex: 1,
          color: '#4f39f6',

          data: data.map((item) => item.revenue),

          barMaxWidth: 50,

          itemStyle: {
            borderRadius: [6, 6, 0, 0],
          },

          emphasis: {
            focus: 'series',
          },
        },
      ],

      textStyle: {
        fontFamily: 'Vazirmatn',
      },
    };
  });
}
