import { IconDiamond } from '@tabler/icons-react';

const sizeMap = {
  sm: 'h-7 w-7',
  md: 'h-10 w-10',
  lg: 'h-20 w-20',
  xl: 'h-50 w-50',
  xxl: 'h-100 w-100'
};

interface Props {
  size: 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
}

export function DiamondIcon({ size }: Props) {
  return (
    <IconDiamond
      className={`/* a clean warm gold for light mode */ mx-auto ${sizeMap[size]} text-yellow-500 drop-shadow-[0_2px_4px_rgba(0,0,0,0.08)] dark:text-yellow-400 dark:drop-shadow-[0_0px_10px_rgba(255,215,0,0.50)]`}
    />
  );
}
