import { APIdbGetDiamondsResponse } from "@/types/db/diamonds";

export type DiamondsContextState = APIdbGetDiamondsResponse;

export type Action =
  | { type: "SET_DIAMONDS"; payload: DiamondsContextState }
  | { type: "COLLECT_CODEWARS_DIAMONDS"; codewarsCollectedDiamonds: number };
