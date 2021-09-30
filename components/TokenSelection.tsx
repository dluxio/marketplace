import React, { useEffect } from 'react';

import { useRecoilState, useRecoilValue } from 'recoil';
import { CoinCard } from '.';
import { coinState, selectedCoinState } from '../atoms';

export const TokenSelection = () => {
  const coins = useRecoilValue(coinState);
  const [selectedCoin, setSelectedCoin] = useRecoilState(selectedCoinState);

  useEffect(() => {
    setSelectedCoin(coins[0]);
    console.log(selectedCoin);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coins]);

  return (
    <div className="sm:mx-10 my-5">
      <div className="flex flex-col gap-5">
        {coins.map((coin: any) => (
          <div
            className="cursor-pointer"
            key={coin.id}
            onClick={() => setSelectedCoin(coin)}
          >
            <CoinCard coin={coin} />
          </div>
        ))}
      </div>
    </div>
  );
};
