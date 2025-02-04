export interface Diamonds {
  codewars: number;
  missions: number;
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

export type APIdbGetDiamondsResponse<T> =
  | { success: true; diamonds: T }
  | { success: false; error: string };
