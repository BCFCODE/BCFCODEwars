import { DiamondsContextState } from "../../providers/diamonds/types";

export type DiamondsAction =
  | { type: "LOADING..." }
  | { type: "!SUCCESSFUL_RESPONSE" }
  | { type: "SET_DIAMONDS"; payload: DiamondsContextState }
  | { type: "SET_LOADING"; isLoading: boolean }
  | { type: "SET_ERROR"; isError: boolean }
  | {
      type: "INCREMENT_CODEWARS_DIAMONDS_SUM_AND_TOTAL";
      codewarsCollectedDiamonds: number;
    };
