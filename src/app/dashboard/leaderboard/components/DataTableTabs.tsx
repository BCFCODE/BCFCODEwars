'use client';

import { PropsWithChildren } from 'react';
import useSlotSelector, { Slot } from '../store/useSlotSelector';

interface Props extends PropsWithChildren {
  slots: {
    users: React.ReactNode;
    codewars: React.ReactNode;
  };
}

const DataTableTabs = ({ slots }: Props) => {
  const { slot } = useSlotSelector((s) => s);
  return slot === Slot.Users ? slots.users : slots.codewars;
};

export default DataTableTabs;
