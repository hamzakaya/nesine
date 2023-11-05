import React from 'react';
import columns from '@src/common/columns';

const EventTitle = React.lazy(() => import('./event-title'));

const MatchInfo = React.memo(({ title }: { title: string }) => {
  const cn = 'border border-slate-300 py-1 text-slate-500 text-center';

  return (
    <tr className="bg-gray-100">
      <React.Suspense fallback={null}>
        <EventTitle text={<>{title}</>} style={{ padding: '5px 25px' }} />
      </React.Suspense>
      <td className={`${cn} w-k32`}>Yorumlar</td>
      <td className={`${cn} w-9`}></td>
      {columns.map((col, index) => (
        <td key={index} className={`${cn}`}>
          {col}
        </td>
      ))}
    </tr>
  );
});

export default MatchInfo;
