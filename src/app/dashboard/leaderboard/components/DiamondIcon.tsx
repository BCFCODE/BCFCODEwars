import { IconDiamond } from '@tabler/icons-react';

const sizeMap = {
  sm: 'h-7 w-7',
  md: 'h-25 w-25',
  lg: 'h-45 w-45',
  xl: 'h-50 w-50',
  xxl: 'h-100 w-100'
};

interface Props {
  size: 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
  isLoading?: boolean;
}

export function DiamondIcon({ size, isLoading }: Props) {
  return (
    <IconDiamond
      className={`mx-auto ${sizeMap[size]} text-yellow-500 drop-shadow-[0_2px_4px_rgba(0,0,0,0.08)] dark:text-yellow-400 dark:drop-shadow-[0_0px_10px_rgba(255,215,0,0.30)] ${isLoading ? 'animate-pulse' : ''}`}
    />
  );
}
