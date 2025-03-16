export interface Sum {
  codewars: number;
  missions: number;
  total: number;
}

export interface Diamonds {
  email: string;
  name: string;
  sum: Sum;
}

export interface APIdbDiamondsSuccessResponse {
  success: true;
  data: Diamonds;
}

export interface APIdbDiamondsFailedResponse {
  success: false;
  error: string;
}

export type APIdbGetDiamondsResponse =
  | APIdbDiamondsSuccessResponse
  | APIdbDiamondsFailedResponse;

export enum RewardStatus {
  UnclaimedDiamonds = "unclaimedDiamonds",
  ClaimedDiamonds = "claimedDiamonds",
}
