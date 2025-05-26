import { PERSIST_KEYS } from "@/app/store/storeKeys";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

type Store = {
  diamonds: {
    isIconDisabled: boolean;
  };
  setIsDiamondIconDisabled: (isIconDisabled: boolean) => void;
};

export const useCollectButtonStore = create<Store>()(
  persist(
    immer((set) => ({
      diamonds: { isIconDisabled: false },
      setIsDiamondIconDisabled: (isIconDisabled) =>
        set((state) => {
          state.diamonds.isIconDisabled = isIconDisabled;
        }),
    })),
    {
      name: PERSIST_KEYS.collectButton,
      partialize: (state) => ({}),
    }
  )
);
