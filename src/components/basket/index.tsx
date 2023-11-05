import React from 'react';
import useBetCoupon from '@src/context/useBetCoupon';

export default function Basket() {
  const { totalPrice, selectedBets } = useBetCoupon();

  return (
    <section className="block fixed right-0 bottom-0 py-2 px-5 m-0 w-[calc(500px)] text-sm leading-3 align-baseline bg-white text-neutral-400 shadow-2xl shadow-neutral-600 rounded-tl-lg">
      <div className="p-0 m-0 leading-3 align-baseline border-0">
        <ul className="overflow-y-auto max-h-80">
          {selectedBets.map(({ match: { NID: matchID, N: matchName, C: matchCode }, selectedOdd: { O: odd } }) => (
            <li className="py-2 px-0 m-0 align-baseline border-t-0 border-b border-solid border-x-0 border-neutral-300" key={matchID}>
              4 Kod: {matchCode} Maç: {matchName}
              <strong className="p-0 m-0 font-semibold align-baseline float-right">Oran: {odd}</strong>
            </li>
          ))}
        </ul>
      </div>
      <p className="py-4 px-0 m-0 leading-3 align-baseline">
        Toplam Tutar: <b>{totalPrice}</b>
      </p>
    </section>
  );
}
