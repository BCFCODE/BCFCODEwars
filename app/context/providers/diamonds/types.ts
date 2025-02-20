import { DBDiamonds } from "@/types/db/diamonds";

export interface Context {}

export interface DiamondsContextState extends Context {
  data?: DBDiamonds;
  isLoading: boolean;
  isError: boolean;
  // success: boolean;
  // error?: string;
  // isCollected?: boolean;
  // collectedCount?: number;
  // sumCounter?: number;
  // collectedCounter: number;
}
