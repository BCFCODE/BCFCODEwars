'use client';

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/UI/chart';
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from 'recharts';

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
      className='mx-auto aspect-square h-[320px] w-[320px]'
    >
      <RadarChart height={320} width={320} outerRadius={110} data={chartData}>
        {/* Tooltip */}
        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />

        {/* Drop shadow & gradient defs */}
        <defs>
          {/* <filter id="goldShadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="var(--royal-gold)" floodOpacity="1" />
          </filter> */}
          <radialGradient id='radarGradient' cx='50%' cy='50%' r='80%'>
            <stop offset='0%' stopColor='var(--kyu-7)' stopOpacity={0.9} />
            <stop offset='50%' stopColor='var(--kyu-4)' stopOpacity={0.7} />
            <stop offset='100%' stopColor='var(--kyu-1)' stopOpacity={0.5} />
          </radialGradient>
        </defs>

        {/* Custom colored axis labels with gold glow */}
        <PolarAngleAxis
          radius={115}
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
              <g filter='url(#goldShadow)'>
                <text
                  {...rest}
                  x={x}
                  y={y + 4}
                  textAnchor={textAnchor}
                  fill={colorMap[payload.value] || 'currentColor'}
                  fontWeight='700'
                  fontSize={13}
                >
                  {payload.value.toUpperCase()}
                </text>
              </g>
            );
          }}
        />

        {/* Background grid */}
        <PolarGrid
          stroke='var(--kyu-8)'
          strokeDasharray='1'
          strokeOpacity={0.4}
          strokeWidth={2}
          gridType='polygon'
          radialLines={true}
        />

        {/* Radar shape */}
        <Radar
          dataKey='count'
          stroke='rgba(255, 235, 102, 0.9)'
          strokeWidth={2}
          fill='url(#radarGradient)'
          fillOpacity={0.6}
        />
      </RadarChart>
    </ChartContainer>
  );
}
