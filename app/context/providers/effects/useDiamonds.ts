'use client'

import { Dispatch, useReducer } from "react";
import diamondsReducer, {
  DiamondsAction,
  DiamondsContextState,
  initialDiamondsState,
} from "../../reducers/diamondsReducer";


interface UseDiamonds {
  diamondsState: DiamondsContextState;
  diamondsDispatch: Dispatch<DiamondsAction>;
}

const useDiamonds = (): UseDiamonds => {
  const [diamondsState, diamondsDispatch] = useReducer(
    diamondsReducer,
    initialDiamondsState
  );

  return { diamondsState, diamondsDispatch };
};

export default useDiamonds;
