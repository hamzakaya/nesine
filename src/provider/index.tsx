import React, { useState } from 'react';
import BetCouponManager, { SelectedBets } from '@src/common/utils';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import BetCouponContext from '@src/context';

export default function Provider({ children }: { children: React.ReactNode }) {
  const [selectedBets, setSelectedBets] = useState<SelectedBets>(new Map());
  const betCouponManager = new BetCouponManager({ selectedBets, setSelectedBets });
  const queryClient = new QueryClient();

  return (
    <React.Suspense fallback={null}>
      <QueryClientProvider client={queryClient}>
        <BetCouponContext.Provider value={betCouponManager}>{children}</BetCouponContext.Provider>
      </QueryClientProvider>
    </React.Suspense>
  );
}
