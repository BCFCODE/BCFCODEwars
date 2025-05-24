import { PERSIST_KEYS } from "@/app/store/storeKeys";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

type Store = {
  button: {
    isLoading: boolean;
    isError: boolean;
    isCollected: boolean;
    counter: number;
    collectedDiamondsCount?: number;
    success: boolean;
  };
  diamonds: {
    isDiamondIconButtonDisabled: boolean;
    isLoading: boolean;
    isError: boolean;
    isCollected: boolean;
  };
  // button: {
  //   isClicked: boolean;
  // };
  // setIsClicked: (isClicked: boolean) => void;
};

export const useCollectButtonStore = create<Store>()(
  persist(
    immer((set) => ({
      button: {
        counter: 0,
        isLoading: false,
        isError: false,
        isCollected: false,
        success: false,
      },
      diamonds: {
        isDiamondIconButtonDisabled: false,
        isLoading: false,
        isError: false,
        isCollected: false,
      },
      // button: { isClicked: false },
      // setIsClicked: (isClicked) =>
      //   set((state) => {
      //     state.button.isClicked = isClicked;
      //   }),
    })),
    {
      name: PERSIST_KEYS.collectButton,
      partialize: (state) => ({}),
    }
  )
);
