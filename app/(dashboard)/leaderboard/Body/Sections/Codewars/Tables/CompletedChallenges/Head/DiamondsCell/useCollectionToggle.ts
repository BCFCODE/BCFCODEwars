import { useRef } from "react";

const useCollectionToggle = () => {
  const collectionToggleState = useRef({
    collected: true,
    notCollected: false,
    both: false,
  });

  const handle = {
    selectNotCollectedDiamonds: () => {
      const state = collectionToggleState.current;

      if (state.collected)
        collectionToggleState.current.notCollected = !state.notCollected;

      collectionToggleState.current.both =
        state.collected && state.notCollected;
    },
    selectCollectedDiamonds: () => {
      const state = collectionToggleState.current;

      if (state.notCollected)
        collectionToggleState.current.collected = !state.collected;
      
      collectionToggleState.current.both =
        state.collected && state.notCollected;
    },
  };

  return { handle, collectionToggleState: collectionToggleState.current };
};

export default useCollectionToggle;
