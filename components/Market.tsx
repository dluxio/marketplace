import React, { useEffect, useState } from 'react';

import { Client } from '@hiveio/dhive';

import axios from 'axios';

import { MarketNav } from '.';
import { CoinCard } from '.';

import { useRecoilValue } from 'recoil';
import { marketNavState } from '../atoms';

export const Market = () => {
  const client = new Client('');
  const selectedMarket = useRecoilValue(marketNavState);
  const [coins, setCoins] = useState<any>([]);

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
      {selectedMarket === 'exchange' && (
        <>
          <h1 className="text-3xl mx-10 my-4 text-white font-medium">TOKENS</h1>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mx-10">
            {coins &&
              coins.map((coin: any) => <CoinCard key={coin.id} coin={coin} />)}
          </div>
          <h1 className="text-3xl mx-10 mb-4 mt-10 text-white font-medium">
            NFT
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mx-10"></div>
        </>
      )}
    </div>
  );
};
