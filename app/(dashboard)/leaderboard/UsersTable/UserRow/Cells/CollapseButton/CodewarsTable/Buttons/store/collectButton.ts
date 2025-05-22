import { PERSIST_KEYS } from "@/app/store/storeKeys";
import { AuthenticatedUser } from "@/types/users";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

type Store = {
  diamonds: {
    counter: number;
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
      diamonds: { counter: 0, isCollected: false },
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
