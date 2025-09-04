import { Table } from '@tanstack/react-table';
import React from 'react';
import { UsersTableData } from '../types';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger
} from '@radix-ui/react-hover-card';
import { cn } from '@/lib/utils';

interface LeftFooterProps {
  table: Table<UsersTableData>;
  who: string;
}

export function LeftFooter({ table, who }: LeftFooterProps) {
  const selectedCount = table.getFilteredSelectedRowModel().rows.length;
  const totalCount = table.getFilteredRowModel().rows.length;

  const getMessage = () => {
    if (selectedCount === 0) {
      return `No ${who.toLowerCase()}${totalCount === 1 ? '' : 's'} selected.`;
    }
    if (selectedCount === totalCount && totalCount > 0) {
      return `All ${totalCount} ${who.toLowerCase()}${totalCount === 1 ? '' : 's'} selected! 🎉`;
    }
    return `${selectedCount} ${who.toLowerCase()}${selectedCount === 1 ? '' : 's'} of ${totalCount} selected.`;
  };

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <div
          className={cn(
            'text-muted-foreground hidden flex-1 text-sm font-medium transition-all duration-300 lg:flex',
            selectedCount > 0 && 'text-primary animate-pulse'
          )}
          role='status'
          aria-live='polite'
        >
          {getMessage()}
        </div>
      </HoverCardTrigger>
      <HoverCardContent
        className='bg-background border-muted max-w-xs rounded-md border p-4 shadow-lg'
        side='top'
        align='start'
      >
        <p className='text-foreground text-sm'>
          {selectedCount === 0
            ? `Select ${who.toLowerCase()}${totalCount === 1 ? '' : 's'} from the table to highlight them.`
            : `You've selected ${selectedCount} out of ${totalCount} ${who.toLowerCase()}${totalCount === 1 ? '' : 's'}. Click rows to select more!`}
        </p>
      </HoverCardContent>
    </HoverCard>
  );
}
