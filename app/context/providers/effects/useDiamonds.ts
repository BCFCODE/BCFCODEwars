'use client'

import DiamondsAPIService from "@/app/api/services/diamonds";
import { Dispatch, useEffect, useReducer } from "react";
import diamondsReducer, {
  DiamondsAction,
  DiamondsContextState,
  initialDiamondsState,
} from "../../reducers/diamondsReducer";

const { getDiamonds } = new DiamondsAPIService();

interface UseDiamonds {
  diamondsState: DiamondsContextState;
  diamondsDispatch: Dispatch<DiamondsAction>;
}

const useDiamonds = (): UseDiamonds => {
  const [diamondsState, diamondsDispatch] = useReducer(
    diamondsReducer,
    initialDiamondsState
  );

  useEffect(() => {
    (async () => {
      const response = await getDiamonds({ cache: "no-store" });
      // console.log('DiamondsProvider  getDiamonds({ cache: "no-store" }); response', response)
      if (response.success) {
        diamondsDispatch({
          type: "SET_DIAMONDS",
          payload: {
            ...initialDiamondsState,
            data: response.data,
          },
        });
      } else {
        diamondsDispatch({ type: "SET_LOADING", isLoading: true });
        diamondsDispatch({ type: "SET_ERROR", isError: true });
      }
    })();
  }, []);

  return { diamondsState, diamondsDispatch };
};

export default useDiamonds;
