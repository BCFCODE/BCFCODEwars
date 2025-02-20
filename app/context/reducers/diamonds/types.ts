import { DiamondsContextState } from "../../providers/diamonds/types";

export type Action =
  | { type: "SET_DIAMONDS"; payload: DiamondsContextState }
  | { type: "SET_LOADING"; isLoading: boolean }
  | { type: "SET_ERROR"; isError: boolean }
  | { type: "COLLECT_CODEWARS_DIAMONDS"; codewarsCollectedDiamonds: number };
