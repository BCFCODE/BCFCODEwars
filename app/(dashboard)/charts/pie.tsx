// https://echarts.apache.org/examples/en/editor.html?c=pie-roseType-simple&theme=dark&lang=ts

// https://echarts.apache.org/examples/en/editor.html?c=dataset-link&theme=dark&lang=ts

'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import * as echarts from 'echarts/core';
import {
  ToolboxComponent,
  LegendComponent,
  TooltipComponent,
  TitleComponent,
} from 'echarts/components';
import { PieChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';

// Register required ECharts components
echarts.use([
  ToolboxComponent,
  LegendComponent,
  TooltipComponent,
  TitleComponent,
  PieChart,
  CanvasRenderer,
]);

// Dynamically import ReactECharts with SSR disabled
const ReactECharts = dynamic(() => import('echarts-for-react'), { ssr: false });

const MyChartComponent: React.FC = () => {
  const option = {
    title: {
      text: 'Nightingale Chart',
      subtext: 'Example of a Pie Chart with Area Radius',
      left: 'center',
    },
    tooltip: {
      trigger: 'item',
    },
    legend: {
      top: 'bottom',
    },
    toolbox: {
      show: true,
      feature: {
        mark: { show: true },
        dataView: { show: true, readOnly: false },
        restore: { show: true },
        saveAsImage: { show: true },
      },
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: [50, 250],
        center: ['50%', '50%'],
        roseType: 'area',
        itemStyle: {
          borderRadius: 8,
        },
        data: [
          { value: 30, name: 'Rose 1' },
          { value: 38, name: 'Rose 2' },
          { value: 32, name: 'Rose 3' },
          { value: 30, name: 'Rose 4' },
          { value: 28, name: 'Rose 5' },
          { value: 26, name: 'Rose 6' },
          { value: 22, name: 'Rose 7' },
          { value: 18, name: 'Rose 8' },
        ],
      },
    ],
  };

  return <ReactECharts option={option} style={{ height: 700 }} />;
};

export default MyChartComponent;



// 'use client';

// import React, { useEffect, useRef } from 'react';
// import * as echarts from 'echarts/core';
// import {
//   DatasetComponent,
//   TooltipComponent,
//   GridComponent,
//   LegendComponent,
// } from 'echarts/components';
// import {
//   LineChart,
//   PieChart,
// } from 'echarts/charts';
// import {
//   UniversalTransition,
//   LabelLayout,
// } from 'echarts/features';
// import { CanvasRenderer } from 'echarts/renderers';

// // Register required ECharts components
// echarts.use([
//   DatasetComponent,
//   TooltipComponent,
//   GridComponent,
//   LegendComponent,
//   LineChart,
//   PieChart,
//   CanvasRenderer,
//   UniversalTransition,
//   LabelLayout,
// ]);

// const MyChartComponent: React.FC = () => {
//   const chartRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     if (chartRef.current) {
//       const myChart = echarts.init(chartRef.current, 'dark');

//       const option: echarts.EChartsOption = {
//         legend: {},
//         tooltip: {
//           trigger: 'axis',
//           showContent: false,
//         },
//         dataset: {
//           source: [
//             ['product', '2012', '2013', '2014', '2015', '2016', '2017'],
//             ['Milk Tea', 56.5, 82.1, 88.7, 70.1, 53.4, 85.1],
//             ['Matcha Latte', 51.1, 51.4, 55.1, 53.3, 73.8, 68.7],
//             ['Cheese Cocoa', 40.1, 62.2, 69.5, 36.4, 45.2, 32.5],
//             ['Walnut Brownie', 25.2, 37.1, 41.2, 18, 33.9, 49.1],
//           ],
//         },
//         xAxis: { type: 'category' },
//         yAxis: { gridIndex: 0 },
//         grid: { top: '55%' },
//         series: [
//           {
//             type: 'line',
//             smooth: true,
//             seriesLayoutBy: 'row',
//             emphasis: { focus: 'series' },
//           },
//           {
//             type: 'line',
//             smooth: true,
//             seriesLayoutBy: 'row',
//             emphasis: { focus: 'series' },
//           },
//           {
//             type: 'line',
//             smooth: true,
//             seriesLayoutBy: 'row',
//             emphasis: { focus: 'series' },
//           },
//           {
//             type: 'line',
//             smooth: true,
//             seriesLayoutBy: 'row',
//             emphasis: { focus: 'series' },
//           },
//           {
//             type: 'pie',
//             id: 'pie',
//             radius: '30%',
//             center: ['50%', '25%'],
//             emphasis: {
//               focus: 'self',
//             },
//             label: {
//               formatter: '{b}: {@2012} ({d}%)',
//             },
//             encode: {
//               itemName: 'product',
//               value: '2012',
//               tooltip: '2012',
//             },
//           },
//         ],
//       };

//       myChart.setOption(option);

//       myChart.on('updateAxisPointer', function (event: any) {
//         const xAxisInfo = event.axesInfo[0];
//         if (xAxisInfo) {
//           const dimension = xAxisInfo.value + 1;
//           myChart.setOption<echarts.EChartsOption>({
//             series: {
//               id: 'pie',
//               label: {
//                 formatter: '{b}: {@[' + dimension + ']} ({d}%)',
//               },
//               encode: {
//                 value: dimension,
//                 tooltip: dimension,
//               },
//             },
//           });
//         }
//       });

//       return () => {
//         myChart.dispose();
//       };
//     }
//   }, []);

//   return <div ref={chartRef} style={{ height: 700 }} />;
// };

// export default MyChartComponent;