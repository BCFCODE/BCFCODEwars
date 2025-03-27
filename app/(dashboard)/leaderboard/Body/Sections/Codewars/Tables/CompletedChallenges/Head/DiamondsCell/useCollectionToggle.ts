import useCurrentUserDispatchContext from "@/app/context/hooks/db/useCurrentUserDispatchContext";
import { CodeChallengesFilter } from "@/types/diamonds";
import { useEffect, useRef, useState } from "react";

const useCollectionToggle = () => {
  const currentUserDispatch = useCurrentUserDispatchContext();
  const collectionToggleState = useRef({
    claimedDiamonds: true,
    unclaimedDiamonds: false,
    both: false,
  });

  const [filterName, setFilterName] = useState<CodeChallengesFilter>(
    CodeChallengesFilter.ClaimedDiamonds
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

  const selectNotCollectedDiamonds = () => {
    const state = collectionToggleState.current;

    if (state.claimedDiamonds)
      collectionToggleState.current.unclaimedDiamonds =
        !state.unclaimedDiamonds;

    collectionToggleState.current.both =
      state.claimedDiamonds && state.unclaimedDiamonds;

    updateFilter(); // Update only when necessary
  };

  const selectCollectedDiamonds = () => {
    const state = collectionToggleState.current;

    if (state.unclaimedDiamonds)
      collectionToggleState.current.claimedDiamonds = !state.claimedDiamonds;

    collectionToggleState.current.both =
      state.claimedDiamonds && state.unclaimedDiamonds;

    updateFilter(); // Update only when necessary
  };

  useEffect(() => {
    currentUserDispatch({ type: "UPDATE_COLLECTION_FILTER", filterName });
  }, [filterName]);

  return {
    handle: { selectCollectedDiamonds, selectNotCollectedDiamonds },
    collectionToggleState: collectionToggleState.current,
  };
};

export default useCollectionToggle;
