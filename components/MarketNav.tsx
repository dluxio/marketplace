import React from 'react';

import { useRecoilState } from 'recoil';
import { FaShoppingBag } from 'react-icons/fa';
import { marketNavState } from '../atoms';

export const MarketNav = () => {
  const [marketNavSelected, setMarketNavSelected] =
    useRecoilState(marketNavState);
  return (
    <div className="flex mx-10 my-10 text-white gap-8 text-xl">
      <div>
        <p>Exchange</p>
      </div>
      <div>
        <p>Apps</p>
      </div>
      <div>
        <p>News</p>
      </div>
    </div>
  );
};
