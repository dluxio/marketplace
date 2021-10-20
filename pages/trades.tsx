import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { userState } from '../atoms';

import { useRouter } from 'next/router';
import axios from 'axios';
import { NftCard } from '../components';
import { TradeCard } from '../components/TradeCard';

const Trades = () => {
  const [nftTrades, setNftTrades] = useState<[]>();
  const router = useRouter();
  const user: any = useRecoilValue(userState);

  useEffect(() => {
    !user && router.replace('/');

    user &&
      axios
        .get(`https://token.dlux.io/api/trades/nfts/${user.name}`)
        .then(({ data }) => {
          console.log(data);
          setNftTrades(data.result);
        });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <div className="mx-10 my-4 text-white font-medium">
      <title>Trades</title>
      <h1 className="text-3xl">NFT Trades</h1>
      <div className="grid grid-cols-1 sm:grid-cols-4 xl:grid-cols-5 gap-8 my-5">
        {nftTrades &&
          nftTrades.map((trade: any) => (
            <TradeCard key={trade.item} trade={trade} />
          ))}
      </div>
    </div>
  );
};

export default Trades;
