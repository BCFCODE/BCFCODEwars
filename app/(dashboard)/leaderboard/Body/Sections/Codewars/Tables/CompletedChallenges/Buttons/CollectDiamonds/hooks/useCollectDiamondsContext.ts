import useCodewarsDispatchContext from "@/app/context/hooks/codewars/useCodewarsDispatchContext";
import useCurrentUserContext from "@/app/context/hooks/db/useCurrentUserContext";
import useDiamondsContext from "@/app/context/hooks/diamonds/useDiamondsContext";
import useDiamondsDispatchContext from "@/app/context/hooks/diamonds/useDiamondsDispatchContext";

export default function useCollectDiamondsContext() {
  const { currentUser } = useCurrentUserContext();
  const { isDiamondIconButtonDisabled } = useDiamondsContext();
  const diamondsContextDispatch = useDiamondsDispatchContext();
  const codewarsContextDispatch = useCodewarsDispatchContext();

  return {
    currentUser,
    isDiamondIconButtonDisabled,
    diamondsContextDispatch,
    codewarsContextDispatch,
  };
}
