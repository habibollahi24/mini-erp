import { Component, computed, input } from '@angular/core';

import { NgxEchartsDirective, provideEchartsCore } from 'ngx-echarts';
import * as echarts from 'echarts/core';
import {
  GridComponent,
  TooltipComponent,
  LegendComponent,
  TitleComponent,
  PolarComponent,
} from 'echarts/components';
import { PieChart } from 'echarts/charts';

import { CanvasRenderer } from 'echarts/renderers';
import { type EChartsOption } from 'echarts/types/dist/shared';
import { statusColors } from 'ng-zorro-antd/core/color';
echarts.use([
  GridComponent,
  CanvasRenderer,
  TooltipComponent,
  LegendComponent,
  PieChart,
  TitleComponent,
  PolarComponent,
]);

@Component({
  selector: 'dashboard-order-status-chart',
  imports: [NgxEchartsDirective],
  providers: [provideEchartsCore({ echarts })],
  templateUrl: './order-status-chart.component.html',
  styleUrl: './order-status-chart.component.scss',
})
export class OrderStatusChartComponent {
  orderStatusData = input.required<{ name: string; value: number }[]>();

  readonly statusColors: Record<string, string> = {
    'در انتظار': '#faad14',
    ' در حال ارسال': '#13c2c2',
    'لغو شده': '#ff4d4f',
    'در حال پردازش': '#52c41a',
    'ارسال شده': '#4f39f6',
  };

  readonly chartOptions = computed<EChartsOption>(() => {
    const data = this.orderStatusData();

    return {
      tooltip: {
        trigger: 'item',
        formatter: (params: any) => {
          return `${params.name}: ${params.value}`;
        },
      },

      polar: {
        radius: ['15%', '90%'],
      },

      angleAxis: {
        type: 'category',
        data: data.map((item) => item.name),
        startAngle: -90,
        clockwise: false,

        axisLine: {
          show: false,
        },

        axisTick: {
          show: false,
        },

        axisLabel: {
          show: false,
        },
      },

      radiusAxis: {
        type: 'value',

        axisLine: {
          show: false,
        },

        axisTick: {
          show: false,
        },

        axisLabel: {
          show: false,
        },

        splitLine: {
          show: false,
        },
      },

      series: [
        {
          type: 'bar',
          coordinateSystem: 'polar',

          // data: data.map((item) => item.value),

          data: data.map((item) => {
            console.log(item);
            return {
              value: item.value,

              itemStyle: {
                color: this.statusColors[item.name] ?? '#8c8c8c',
              },
            };
          }),

          roundCap: false,

          barWidth: 65,

          showBackground: false,

          backgroundStyle: {
            color: '#f5f5f5',
          },

          label: {
            show: true,
            position: 'end',
            formatter: '{b}',
            fontFamily: 'Vazirmatn',
          },
        },
      ],

      textStyle: {
        fontFamily: 'Vazirmatn',
      },
    };
    // return {
    //   tooltip: {
    //     trigger: 'item',
    //     formatter: '{b}: {c} ({d}%)',
    //   },
    //   textStyle: {
    //     fontFamily: 'Vazirmatn',
    //   },

    //   legend: {
    //     show: true,
    //     orient: 'horizontal',
    //     right: 'center',
    //     top: '0',
    //   },

    //   series: [
    //     {
    //       type: 'pie',

    //       radius: ['5%', '50%'],

    //       center: ['50%', '50%'],

    //       data: data,

    //       label: {
    //         show: true,

    //         fontSize: 13,
    //       },

    //       labelLine: {
    //         show: true,
    //       },

    //       emphasis: {
    //         scale: true,
    //         scaleSize: 6,

    //         label: {
    //           show: true,
    //           fontSize: 15,
    //           fontWeight: 'bold',
    //           formatter: '{b}\n{c}',
    //         },
    //       },
    //     },
    //   ],
    // };
  });
}
