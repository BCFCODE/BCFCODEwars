import useCurrentUserDispatchContext from "@/app/context/hooks/useCurrentUserDispatchContext";
import { CodeChallengesFilter } from "@/types/diamonds";
import { useEffect, useRef, useState } from "react";

const useToggleCollection = () => {
  const currentUserDispatch = useCurrentUserDispatchContext();
  const collectionToggleState = useRef({
    claimedDiamonds: true,
    unclaimedDiamonds: true,
    both: false,
  });

  const [filterName, setFilterName] = useState<CodeChallengesFilter>(
    CodeChallengesFilter.Both
  );

  const updateFilter = () => {
    const state = collectionToggleState.current;
    const newFilter = state.both
      ? CodeChallengesFilter.Both
      : state.claimedDiamonds
        ? CodeChallengesFilter.ClaimedDiamonds
        : CodeChallengesFilter.UnclaimedDiamonds;

    newFilter !== filterName && setFilterName(newFilter);
  };

  const onUnclaimedDiamondIcon = () => {
    const state = collectionToggleState.current;

    if (state.claimedDiamonds)
      collectionToggleState.current.unclaimedDiamonds =
        !state.unclaimedDiamonds;

    collectionToggleState.current.both =
      state.claimedDiamonds && state.unclaimedDiamonds;

    updateFilter(); // Update only when necessary
  };

  const onClaimedDiamondIcon = () => {
    const state = collectionToggleState.current;

    if (state.unclaimedDiamonds)
      collectionToggleState.current.claimedDiamonds = !state.claimedDiamonds;

    collectionToggleState.current.both =
      state.claimedDiamonds && state.unclaimedDiamonds;

    updateFilter(); // Update only when necessary
  };

  useEffect(() => {
    currentUserDispatch({ type: "UPDATE_COLLECTION_FILTER", filterName });
  }, [filterName, currentUserDispatch]);

  return {
    handle: { onClaimedDiamondIcon, onUnclaimedDiamondIcon },
    collectionToggleState: collectionToggleState.current,
  };
};

export default useToggleCollection;
