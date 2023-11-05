import { useContext } from 'react';
import BetCouponContext from '.';

export default function useBetCoupon() {
  const context = useContext(BetCouponContext);
  return context;
}
