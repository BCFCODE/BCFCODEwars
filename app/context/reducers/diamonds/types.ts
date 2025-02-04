import { APIdbGetDiamondsResponse, DBDiamonds } from "@/types/db/diamonds";

export type DiamondsState = APIdbGetDiamondsResponse<DBDiamonds>;

export type Action = { type: "SET_DIAMONDS"; payload: DiamondsState };

