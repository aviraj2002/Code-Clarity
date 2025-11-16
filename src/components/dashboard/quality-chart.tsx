'use client';

import { Area, AreaChart, CartesianGrid, XAxis, Tooltip, Legend } from 'recharts';
import {
  ChartContainer,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from '@/components/ui/chart';
import { qualityChartData, qualityChartConfig } from '@/lib/mock-data';

export function QualityChart() {
  return (
    <ChartContainer config={qualityChartConfig} className="h-[250px] w-full">
      <AreaChart
        accessibilityLayer
        data={qualityChartData}
        margin={{
          left: 12,
          right: 12,
        }}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="date"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <Tooltip cursor={false} content={<ChartTooltipContent indicator="dot" />} />
        <Legend content={<ChartLegendContent />} />
        <Area
          dataKey="ProjectPhoenix/frontend"
          type="natural"
          fill="var(--color-ProjectPhoenix/frontend)"
          fillOpacity={0.4}
          stroke="var(--color-ProjectPhoenix/frontend)"
          stackId="a"
        />
        <Area
          dataKey="ProjectPhoenix/backend"
          type="natural"
          fill="var(--color-ProjectPhoenix/backend)"
          fillOpacity={0.4}
          stroke="var(--color-ProjectPhoenix/backend)"
          stackId="a"
        />
      </AreaChart>
    </ChartContainer>
  );
}
