import React from 'react';

import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
// import { IconTrendingDown, IconTrendingUp } from '@tabler/icons-react';

export function StatCardContainer({
  title,
  primary,
  meta,
  badge,
  hint
}: {
  title: string;
  primary: React.ReactNode;
  meta?: React.ReactNode;
  badge?: React.ReactNode;
  hint?: string;
}) {
  return (
    <Card className='group @container/card bg-gradient-to-t from-[var(--bg-background)]/10 to-[var(--kyu-3)]/10 dark:from-[var(--bg-background)]/10 dark:to-[var(--kyu-3)]/10'>
      <CardHeader>
        <CardDescription>{title}</CardDescription>
        <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
          {primary}
        </CardTitle>
        {badge && <CardAction>{badge}</CardAction>}
      </CardHeader>
      <CardFooter className='-mt-4 flex-col items-start text-sm'>
        {meta && (
          <div className='block font-medium group-hover:hidden'>{meta}</div>
        )}
        {hint && (
          <div className='text-muted-foreground hidden group-hover:block'>
            {hint}
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
