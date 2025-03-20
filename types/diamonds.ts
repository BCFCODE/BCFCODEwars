export interface CodewarsDiamonds {
  id: string;
  rank: number;
  diamondsEarned: number;
}

export type CodewarsRank = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
export type CodewarsRanks = Record<CodewarsRank, number>;

export interface CodewarsRankTotals {
  ranks: CodewarsRanks;
  total: number;
}

export interface DiamondsTotal {
  codewars: CodewarsRankTotals;
  missions: number;
  total: number;
}

export interface Diamonds {
  email: string;
  name: string;
  codewars: CodewarsDiamonds[];
  totals: DiamondsTotal;
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
