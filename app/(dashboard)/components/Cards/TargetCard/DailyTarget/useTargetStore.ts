import { PERSIST_KEYS } from "@/app/store/storeKeys";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

export type TargetLabel = 1 | 2 | 3;

export interface TargetStore {
  label: Record<string, TargetLabel>;
  isHovering: Record<string, boolean>;
  isLoading: Record<string, boolean>;
  setTarget: (data: { email: string; label: TargetLabel }) => void;
  setIsHovering: (data: { email: string; isHovering: boolean }) => void;
  setIsLoading: (data: { email: string; isLoading: boolean }) => void;
}

const useTargetStore = create<TargetStore>()(
  persist(
    immer((set) => ({
      label: {},
      isHovering: {},
      isLoading: {},
      setTarget: ({ email, label }) =>
        set((state) => {
          state.label[email] = label;
        }),
      setIsHovering: ({ email, isHovering }) =>
        set((state) => {
          state.isHovering[email] = isHovering;
        }),
      setIsLoading: ({ email, isLoading }) =>
        set((state) => {
          state.isLoading[email] = isLoading;
        }),
    })),
    {
      name: PERSIST_KEYS.dailyTarget,
      partialize: (state) => ({ label: state.label }),
      onRehydrateStorage: () => (state) => {
        if (!state) return;

        for (const email in state.isLoading) {
          state.setIsLoading({ email, isLoading: false });
        }
      },
    }
  )
);

export default useTargetStore;
