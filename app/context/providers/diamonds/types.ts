import { DBDiamonds } from "@/types/db/diamonds";

export interface Context {}

export interface DiamondsContextState extends Context {
  success: boolean;
  error?: string;
  data?: DBDiamonds;
  isLoading: boolean;
  isError: boolean;
  isCollected?: boolean;
  collectedCount?: number;
  sumCounter?: number;
  collectedCounter: number;
}
