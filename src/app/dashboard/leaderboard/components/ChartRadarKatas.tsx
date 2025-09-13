'use client';

import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from 'recharts';
import { CardContent } from '@/components/UI/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/UI/chart';

const chartData = [
  { rank: 'kyo-1', count: 305 },
  { rank: 'kyo-2', count: 186 },
  { rank: 'kyo-3', count: 214 },
  { rank: 'kyo-4', count: 209 },
  { rank: 'kyo-5', count: 273 },
  { rank: 'kyo-6', count: 237 },
  { rank: 'kyo-7', count: 305 },
  { rank: 'kyo-8', count: 186 }
];

const chartConfig = {
  count: {
    label: 'Count:'
  }
} satisfies ChartConfig;

export function ChartRadarKatas() {
  return (
    <ChartContainer
      config={chartConfig}
      className='mx-auto aspect-square h-[290] w-[290] p-0'
    >
      <RadarChart
        height={300}
        width={300}
        outerRadius={100}
        innerRadius={1}
        data={chartData}
      >
        {/* Tooltip */}
        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />

        {/* Custom colored axis labels */}
        <PolarAngleAxis
          radius={300}
          dataKey='rank'
          tick={({ payload, x, y, textAnchor, ...rest }) => {
            const colorMap: Record<string, string> = {
              'kyo-1': 'var(--kyu-1)',
              'kyo-2': 'var(--kyu-2)',
              'kyo-3': 'var(--kyu-3)',
              'kyo-4': 'var(--kyu-4)',
              'kyo-5': 'var(--kyu-5)',
              'kyo-6': 'var(--kyu-6)',
              'kyo-7': 'var(--kyu-7)',
              'kyo-8': 'var(--kyu-8)'
            };
            return (
              <text
                {...rest}
                x={x}
                y={y}
                textAnchor={textAnchor}
                fill={colorMap[payload.value] || 'currentColor'}
                fontWeight='600'
                fontSize={12}
              >
                {payload.value.toUpperCase()}
              </text>
            );
          }}
        />

        {/* Background grid */}
        <PolarGrid />

        {/* Gradient fill */}
        <defs>
          <radialGradient id='radarGradient' cx='50%' cy='50%' r='70%'>
            <stop offset='0%' stopColor='var(--kyu-7)' stopOpacity={0.9} />
            <stop offset='50%' stopColor='var(--kyu-4)' stopOpacity={0.7} />
            <stop offset='100%' stopColor='var(--kyu-1)' stopOpacity={0.5} />
          </radialGradient>
        </defs>

        {/* Radar shape */}
        <Radar
          dataKey='count'
          stroke='rgba(255, 235, 102, 70%)'
          strokeWidth={2}
          fill='url(#radarGradient)'
          fillOpacity={0.8}
        />
      </RadarChart>
    </ChartContainer>
  );
}
