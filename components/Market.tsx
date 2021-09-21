import React, { useEffect, useState } from 'react';

import { Client } from '@hiveio/dhive';

import axios from 'axios';

import { MarketNav, NftCard } from '.';
import { CoinCard } from '.';

import { useRecoilState, useRecoilValue } from 'recoil';
import { clientState, marketNavState, nftState } from '../atoms';

export const Market = () => {
  const [_recoilClient, setClientState] = useRecoilState(clientState);
  const [nfts, setNfts] = useRecoilState(nftState);
  const [forListingNFT, setForListingNFT] = useState([]);

  const client = new Client([
    'https://api.deathwing.me/',
    'https://rpc.ecency.com/',
    'https://hived.emre.sh/',
    'https://rpc.ausbit.dev/',
    'https://api.hive.blog/',
  ]);
  const selectedMarket = useRecoilValue(marketNavState);
  const [coins, setCoins] = useState<any>([]);

  useEffect(() => {
    setClientState(client);

    const fetchNfts = async () => {
      await axios.get('https://token.dlux.io/api/set/dlux').then((response) => {
        setNfts(response.data.result);
      });
    };

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
      fetchNfts();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setForListingNFT(nfts.filter((nft: any) => nft.owner === 'ls'));
  }, [nfts]);

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
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-8 mx-10 my-3">
            {forListingNFT &&
              forListingNFT.map((nft: any) => (
                <NftCard key={`${nft.set}_${nft.uid}`} nft={nft} />
              ))}
          </div>
        </>
      )}
      {selectedMarket === 'apps' && <h1>Apps screen</h1>}
      {selectedMarket === 'news' && <h1>News screen</h1>}
    </div>
  );
};
