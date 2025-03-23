import useCurrentUserDispatchContext from "@/app/context/hooks/db/useCurrentUserDispatchContext";
import { useRef } from "react";

const useCollectionToggle = () => {
  const currentUserDispatch = useCurrentUserDispatchContext();
  const collectionToggleState = useRef({
    claimedDiamonds: true,
    unclaimedDiamonds: false,
    both: false,
  });

  const selectNotCollectedDiamonds = () => {
    const state = collectionToggleState.current;

    if (state.claimedDiamonds)
      collectionToggleState.current.unclaimedDiamonds =
        !state.unclaimedDiamonds;

    collectionToggleState.current.both =
      state.claimedDiamonds && state.unclaimedDiamonds;
  };
  const selectCollectedDiamonds = () => {
    const state = collectionToggleState.current;

    if (state.unclaimedDiamonds)
      collectionToggleState.current.claimedDiamonds = !state.claimedDiamonds;

    collectionToggleState.current.both =
      state.claimedDiamonds && state.unclaimedDiamonds;
  };

  return {
    handle: { selectCollectedDiamonds, selectNotCollectedDiamonds },
    collectionToggleState: collectionToggleState.current,
  };
};

export default useCollectionToggle;
