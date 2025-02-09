import {
  APIdbGetDiamondsResponse
} from "@/types/db/diamonds";

export type DiamondsState = APIdbGetDiamondsResponse;

export type Action = { type: "SET_DIAMONDS"; payload: DiamondsState };
