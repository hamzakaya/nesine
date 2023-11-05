import { createContext } from 'react';
import { BetCoupon } from '../common/utils';

const BetCouponContext = createContext<BetCoupon>(null);
export default BetCouponContext;
