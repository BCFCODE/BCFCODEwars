import useCodewarsDispatchContext from "@/app/context/hooks/codewars/useCodewarsDispatchContext";
import useDiamondsContext from "@/app/context/hooks/diamonds/useDiamondsContext";
import useDiamondsDispatchContext from "@/app/context/hooks/diamonds/useDiamondsDispatchContext";
import { CodewarsAction } from "@/app/context/reducers/codewarsReducer";
import { DiamondsAction } from "@/app/context/reducers/diamondsReducer";
import { Dispatch } from "react";

export interface UseCollectDiamondsContext {
  diamondsContextDispatch: Dispatch<DiamondsAction>;
  isDiamondIconButtonDisabled: boolean;
  codewarsContextDispatch: Dispatch<CodewarsAction>;
}

export default function useCollectDiamondsContext(): UseCollectDiamondsContext {
  const { isDiamondIconButtonDisabled } = useDiamondsContext();
  const diamondsContextDispatch = useDiamondsDispatchContext();
  const codewarsContextDispatch = useCodewarsDispatchContext();

  return {
    isDiamondIconButtonDisabled,
    diamondsContextDispatch,
    codewarsContextDispatch,
  };
}
