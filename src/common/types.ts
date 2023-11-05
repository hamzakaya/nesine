export enum BetType {
  MatchResult = '1',
  OverUnder = '5',
  DoubleChance = '2',
}

export const betTypes = Object.values(BetType);

declare global {
  interface Match {
    C: string;
    N: string;
    TYPE: string;
    NID: string;
    D: string;
    T: string;
    DAY: string;
    S: string;
    LN: string;
    IMF: boolean;
    OCG: Record<BetType, BetOption>;
    HEC: boolean;
  }

  interface BetOption {
    ID: string;
    N: string;
    MBS: string;
    SO: number;
    OC: Record<string, Odd>;
  }

  interface Odd {
    ID: string;
    O: string;
    N: string;
    MBS: string;
    G: string;
    OD: number;
    IMF: boolean;
  }
}
