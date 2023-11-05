import { BetType } from '@src/common/types';

export default class BetCouponManager implements BetCoupon {
  #selectedBets: SelectedBets;
  #setSelectedBets: SetState;

  constructor({ selectedBets, setSelectedBets }: { selectedBets: SelectedBets; setSelectedBets: SetState }) {
    this.#selectedBets = selectedBets;
    this.#setSelectedBets = setSelectedBets;
  }

  toggleOddBet = (match: Match) => {
    return (betType: BetType, selectedOddId: string) => {
      const { NID: matchId, OCG: matchOCG } = match;
      const oddId = `${betType}-${selectedOddId}`;

      this.#setSelectedBets((prev) => {
        if (prev.get(matchId)?.oddId === oddId) prev.delete(matchId);
        else
          prev.set(matchId, {
            match,
            oddId,
            selectedOdd: matchOCG[betType].OC[selectedOddId],
          });

        return new Map(prev);
      });
    };
  };

  isSelectedBet = (matchId: string, oddId: string) => {
    if (!this.#selectedBets.has(matchId)) return false;
    return this.#selectedBets.get(matchId)?.oddId === oddId;
  };

  get selectedBets() {
    return Array.from(this.#selectedBets.values()).reverse();
  }

  get totalPrice() {
    return new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(
      this.#selectedBets.size > 0
        ? parseFloat(this.selectedBets.reduce((total, { selectedOdd: { O: odd } }) => total * parseFloat(odd), 1).toFixed(2))
        : 0,
    );
  }
}

export type IBet = {
  match: Match;
  selectedOdd: Odd;
  oddId: string;
};

export type BetCoupon = {
  toggleOddBet: (match: Match) => (betType: string, selectedOddId: string) => void;
  isSelectedBet: (matchId: string, oddId: string) => boolean;
  selectedBets: IBet[];
  totalPrice: string;
};

export type SelectedBets = Map<string, IBet>;
type SetState = React.Dispatch<React.SetStateAction<SelectedBets>>;
