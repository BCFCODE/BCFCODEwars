export interface Diamonds {
  codewars: number;
  missions: number;
  sum: number;
}

export interface CodewarsChallengeDiamonds {
  id: string;
  diamonds?: number;
}

export interface CodewarsDiamonds {
  challenges: CodewarsChallengeDiamonds[];
}

export interface DBDiamonds {
  email: string;
  name: string;
  diamonds: Diamonds;
  codewars: CodewarsDiamonds;
}

export interface APIdbDiamondsSuccessResponse {
  success: true;
  data: DBDiamonds;
}

export interface APIdbDiamondsFailedResponse {
  success: false;
  error: string;
}

export type APIdbGetDiamondsResponse =
  | APIdbDiamondsSuccessResponse
  | APIdbDiamondsFailedResponse;
