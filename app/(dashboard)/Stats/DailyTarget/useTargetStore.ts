import { PERSIST_KEYS } from "@/app/store/storeKeys";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

export type TargetLevel = 1 | 2 | 3;

interface TargetStore {
  isHovering: boolean;
  setIsHovering: (isHovering: boolean) => void;
  target: TargetLevel;
  setTarget: (level: TargetLevel) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}

const useTargetStore = create<TargetStore>()(
  persist(
    (set) => ({
      isHovering: false,
      setIsHovering: (isHovering) => set({ isHovering }),
      target: 1,
      setTarget: (level) => set({ target: level }),
      isLoading: true,
      setIsLoading: (isLoading: boolean) => set({ isLoading }),
    }),
    {
      name: PERSIST_KEYS.dailyTarget,
      // ✅ Only persist `target`, ignore `isHovering`
      partialize: (state) => ({ target: state.target }),
      onRehydrateStorage: () => (state) => {
        state?.setIsLoading(false);
      },
    }
  )
);

useTargetStore.getState().setIsLoading = (isLoading: boolean) => {
  useTargetStore.setState({ isLoading });
};

export default useTargetStore;
