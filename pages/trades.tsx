import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { userState } from '../atoms';

import { useRouter } from 'next/router';
import axios from 'axios';

const Trades = () => {
  const [nftTrades, setNftTrades] = useState([]);
  const router = useRouter();
  const user: any = useRecoilValue(userState);

  useEffect(() => {
    !user && router.replace('/');

    user &&
      axios
        .get(`https://token.dlux.io/api/trades/nft/${user!.name}`)
        .then(({ data }) => {
          console.log(data);
        });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <div className="w-full text-white z-0">
      <h1 className="text-white mt-10 mx-10 mb-5 text-3xl font-semibold">
        NFT Trades
      </h1>
      {nftTrades.map((trade) => {
        <div
          className={'bg-gray-600 rounded-xl border-2 border-gray-800'}
        ></div>;
      })}
    </div>
  );
};

export default Trades;
