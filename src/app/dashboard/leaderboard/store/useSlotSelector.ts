import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export enum Slot {
  Users = 'users',
  Codewars = 'codewars'
}

type State = {
  slot: Slot;
};

type Actions = {
  selectSlot: (slot: Slot) => void;
};

type Store = State & Actions;

const useSlotSelector = create<Store>()(
  persist(
    (set) => ({
      slot: Slot.Users,
      selectSlot: (slot) => set({ slot })
    }),
    { name: 'leaderboard-slot-selector' /* skipHydration: true */ }
  )
);

export default useSlotSelector;
