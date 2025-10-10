'use client';

import { Button } from '@/components/ui/button';

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from '@/components/ui/drawer';
import { Separator } from '@/components/ui/separator';
import { useIsMobile } from '@/hooks/use-mobile';
import { CodewarsTableData } from '@/types';
import Link from 'next/link';
import { ChartRadarKatas } from '../../../../../components/ui/ChartRadarKatas';

function TableCellViewer({
  codewarsUser
}: {
  codewarsUser: CodewarsTableData;
}) {
  const isMobile = useIsMobile();

  return (
    <Drawer direction={isMobile ? 'bottom' : 'right'}>
      <DrawerTrigger asChild>
        <Button
          variant='link'
          className='text-foreground w-fit cursor-pointer px-0 text-left'
        >
          {codewarsUser.name}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className='gap-1'>
          <DrawerTitle className='text-lg font-semibold tracking-tight'>
            Warrior: {codewarsUser.name}
          </DrawerTitle>
          <DrawerDescription>
            <span className='text-muted-foreground text-left text-sm leading-relaxed'>
              {codewarsUser.name} is smashing challenges and stacking{' '}
              <span className='text-royal-gold font-semibold'>
                {codewarsUser.totalDiamonds ?? 0} diamonds
              </span>
              ! Check out their progress below.
            </span>
          </DrawerDescription>
        </DrawerHeader>

        <div className='flex flex-col gap-4 overflow-y-auto px-4 text-sm'>
          {!isMobile ? (
            <>
              <Link href='/dashboard/codewars'>
                <ChartRadarKatas />
              </Link>
              {/* <DiamondsCollectButton count={codewarsUser.totalDiamonds ?? 0} /> */}
              <Separator />
            </>
          ) : (
            <Link href='/dashboard/codewars'>
              <ChartRadarKatas />
            </Link>
          )}
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
