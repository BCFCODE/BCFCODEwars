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
