import { create } from "zustand";
import { persist } from "zustand/middleware";

export type TargetLevel = 1 | 2 | 3;

interface TargetStore {
  target: TargetLevel;
  setTarget: (level: TargetLevel) => void;
}

const useTargetStore = create<TargetStore>()(
  persist(
    (set) => ({
      target: 1,
      setTarget: (level) => set({ target: level }),
    }),
    {
      name: "daily-target",
    }
  )
);

export default useTargetStore;
