import { create } from "zustand";
import { persist } from "zustand/middleware";

export type TargetLevel = 1 | 2 | 3;

interface TargetStore {
  isHovering: boolean;
  setIsHovering: (isHovering: boolean) => void;
  target: TargetLevel;
  setTarget: (level: TargetLevel) => void;
}

const useTargetStore = create<TargetStore>()(
  persist(
    (set) => ({
      isHovering: false,
      target: 1,
      setTarget: (level) => set({ target: level }),
      setIsHovering: (isHovering) => set({ isHovering }),
    }),
    {
      name: "daily-target",
      // ✅ Only persist `target`, ignore `isHovering`
      partialize: (state) => ({ target: state.target }),
    }
  )
);

export default useTargetStore;
