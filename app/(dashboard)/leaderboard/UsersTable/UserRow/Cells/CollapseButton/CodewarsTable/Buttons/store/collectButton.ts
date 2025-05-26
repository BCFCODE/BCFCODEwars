import { PERSIST_KEYS } from "@/app/store/storeKeys";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

type Store = {
  button: {
    isClicked: boolean;
  };
  diamonds: {
    counter: number;
    isCollected: boolean;
  };
  setIsClicked: (isClicked: boolean) => void;
};

export const useCollectButtonStore = create<Store>()(
  persist(
    immer((set) => ({
      diamonds: { counter: 0, isCollected: false },
      button: { isClicked: false },
      setIsClicked: (isClicked) =>
        set((state) => {
          state.button.isClicked = isClicked;
        }),
    })),
    {
      name: PERSIST_KEYS.collectButton,
      partialize: (state) => ({}),
    }
  )
);
