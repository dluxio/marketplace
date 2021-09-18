import React, { useEffect } from 'react';

import { coinState } from '../atoms';
import { useRecoilState } from 'recoil';

import axios from 'axios';

import { MarketNav } from '.';
import { CoinCard } from '.';

export const Market = () => {
  const [coins, setCoins] = useRecoilState<any>(coinState);

  useEffect(() => {
    const fetchCoins = async () => {
      const { data: hiveData } = await axios.get(
        'https://api.coingecko.com/api/v3/coins/hive',
        {
          headers: {
            accept: 'application/json',
          },
        }
      );
      const { data: bitcoinData } = await axios.get(
        'https://api.coingecko.com/api/v3/coins/bitcoin',
        {
          headers: {
            accept: 'application/json',
          },
        }
      );
      const { data: ethData } = await axios.get(
        'https://api.coingecko.com/api/v3/coins/ethereum',
        {
          headers: {
            accept: 'application/json',
          },
        }
      );
      setCoins([hiveData, bitcoinData, ethData]);
    };

    if (!coins.length) {
      fetchCoins();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="w-full h-full">
      <MarketNav />
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 flex-grow mx-10">
        {coins &&
          coins.map((coin: any) => <CoinCard key={coin.id} coin={coin} />)}
      </div>
    </div>
  );
};
