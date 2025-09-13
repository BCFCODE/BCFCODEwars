'use client';

import { Button } from '@/components/UI/button';

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from '@/components/UI/drawer';
import { Separator } from '@/components/UI/separator';
import { useIsMobile } from '@/hooks/use-mobile';
import { ChartRadarKatas } from '../../components/ChartRadarKatas';
import { DiamondIcon } from '../../components/DiamondIcon';
import { DiamondsCountBadge } from '../../components/DiamondsCountBadge';
import { CodewarsTableData } from '../../types';

function TableCellViewer({ item }: { item: CodewarsTableData }) {
  const isMobile = useIsMobile();

  return (
    <Drawer direction={isMobile ? 'bottom' : 'right'}>
      <DrawerTrigger asChild>
        <Button
          variant='link'
          className='text-foreground w-fit cursor-pointer px-0 text-left'
        >
          {item.name}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className='gap-1'>
          <DrawerTitle className='text-lg font-semibold tracking-tight'>
            {item.name}
          </DrawerTitle>
          <DrawerDescription>
            Dive into this kata’s journey — here’s a breakdown of your solved
            challenges and earned diamonds.
          </DrawerDescription>
        </DrawerHeader>

        <div className='flex flex-col gap-4 overflow-y-auto px-4 text-sm'>
          {!isMobile && (
            <>
              <ChartRadarKatas />
              <Separator />
            </>
          )}
          <DiamondsCountBadge size='lg' count={item.totalDiamonds ?? 0}>
            <DiamondIcon size='xl' />
          </DiamondsCountBadge>
        </div>

        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant='outline' className='cursor-pointer'>
              Got it ✨
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export { TableCellViewer };
