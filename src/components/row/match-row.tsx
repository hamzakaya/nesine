import React from 'react';
import { BetType } from '@src/common/types';

const MatchInfo = React.lazy(() => import('./match-info'));
const EventTitle = React.lazy(() => import('./event-title'));
const BetCell = React.lazy(() => import('./bet-cell'));
const Cell = React.lazy(() => import('./cell'));

const MatchRow = React.memo(({ match }: { match: Match }) => {
  const { N: matchName, T: matchTime, OCG: matchOCG, C: matchCode } = match;
  const title = `${match.D} ${match.DAY} ${match.LN}`;

  return (
    <React.Suspense fallback={null}>
      <MatchInfo title={title} />
      <tr className="divide-x divide-gray-200 hover-bg-gray-100 font-light">
        <EventTitle
          text={
            <React.Fragment>
              <b className="font-bold mr-1">{matchCode}</b>
              {`${matchTime} ${matchName}`}
            </React.Fragment>
          }
        />
        <Cell text="Yorumlar" />
        <Cell text={matchOCG[BetType.MatchResult].MBS} />
        <BetCell match={match} />
        <Cell text="3" />
      </tr>
    </React.Suspense>
  );
});

export default MatchRow;
