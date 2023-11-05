import React, { useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useVirtualizer } from '@tanstack/react-virtual';
import MatchRow from '@src/components/row/match-row';
import fetchMatchs from '@src/common/api';
import columns from '@src/common/columns';
import Error from '@src/components/error';
import Loading from '@src/components/loading';
import Basket from '@src/components/basket';

export default function BetsTable() {
  const ref = React.useRef();

  const { isLoading, isError, data } = useQuery({
    queryKey: ['nesineCase'],
    queryFn: fetchMatchs,
    retry: false,
  });

  const rowVirtualizer = useVirtualizer({
    count: Array.from(data ?? []).length,
    getScrollElement: () => ref.current,
    estimateSize: useCallback(() => 74, []),
    overscan: 20,
  });

  if (isError) return <Error />;
  if (isLoading) return <Loading />;

  return (
    <div className="p-0 m-0 leading-3 align-baseline border-0 text-neutral-400 text-sm">
      <div className="relative text-neutral-400">
        <div className="p-0 m-0 align-baseline border-0">
          <TableHeader count={rowVirtualizer.options.count} />
          <section className="block overflow-y-auto p-0 m-0 mt-12 h-[calc(100vh-80px)] align-baseline border-0" ref={ref}>
            <div
              className="relative w-full h-full align-baseline border-0"
              style={{
                height: rowVirtualizer.getTotalSize(),
              }}
            >
              <table
                style={{
                  transform: `translateY(calc(${rowVirtualizer.getVirtualItems().at(0)?.start}px - 5px))`,
                }}
                className="absolute top-0 left-0 p-0 m-0 w-full align-baseline border-0"
              >
                <tbody>
                  {rowVirtualizer.getVirtualItems().map((item, index) => (
                    <MatchRow key={`${item.key}_${index}`} data-index={item.index} match={data[item.index]} />
                  ))}
                </tbody>
              </table>
            </div>
          </section>
          <Basket />
        </div>
      </div>
    </div>
  );
}

function TableHeader({ count }: { count: number }) {
  return (
    <section className="block fixed top-0 left-0 z-10 p-0 m-0 w-full h-12 align-baseline shadow-2xl">
      <div className="p-0 m-0 align-baseline border-0">
        <div className="flex py-0 pr-4 pl-0 m-0 leading-3 align-baseline bg-white text-neutral-400" style={{ padding: '10px 20px 0' }}>
          <div className="flex items-center py-1 px-2 m-0 w-96 align-baseline">
            <span className="p-0 m-0 align-baseline border-0">Event count: {count}</span>
          </div>
          <div className="flex flex-grow flex-shrink p-0 m-0 align-baseline ">
            <div className="contents flex-row p-0 m-0 align-baseline">
              <div className="flex justify-center items-center p-0 m-0 text-center align-baseline">Yorumlar</div>
              <div className="flex justify-center items-center p-0 m-0 text-center align-baseline" />
            </div>
            {columns.map((col, index) => (
              <div className="contents flex-row p-0 m-0 align-baseline" key={`col_${index}`}>
                <div className="justify-center items-center p-0 m-0 w-1/4 text-center align-baseline">{col}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
