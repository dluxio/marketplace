import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { userState } from '../atoms';

import { useRouter } from 'next/router';
import axios from 'axios';
import { TradeCard } from '../components/TradeCard';

const Trades = () => {
  const [tradesToRespond, setTradesToRespond] = useState<[]>();
  const [tradesToManage, setTradesToManage] = useState<[]>();
  const [respond, setRespond] = useState(true);
  const router = useRouter();
  const user: any = useRecoilValue(userState);

  useEffect(() => {
    !user && router.replace('/');

    user &&
      axios
        .get(`https://token.dlux.io/api/trades/nfts/${user.name}`)
        .then(({ data }) => {
          setTradesToRespond(
            data.result.filter((trade: any) => trade.from !== user.name)
          );
          setTradesToManage(
            data.result.filter((trade: any) => trade.from === user.name)
          );
        });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <div className="mx-10 my-4 text-white font-medium">
      <title>Trades</title>
      <div className="flex justify-center">
        <button
          onClick={() => setRespond(true)}
          className={`p-2 ${
            respond && 'bg-gray-800'
          } rounded-l-full bg-gray-700 text-white transition-all`}
        >
          Respond
        </button>
        <button
          onClick={() => setRespond(false)}
          className={`p-2 ${
            !respond && 'bg-gray-800'
          } rounded-r-full bg-gray-700 text-white transition-all`}
        >
          Manage
        </button>
      </div>
      <h1 className="text-3xl">Trades</h1>
      <div className="grid grid-cols-1 sm:grid-cols-4 xl:grid-cols-5 gap-8 my-5">
        {respond
          ? tradesToRespond &&
            tradesToRespond.map((trade: any) => (
              <TradeCard key={trade.item} trade={trade} />
            ))
          : tradesToManage &&
            tradesToManage.map((trade: any) => (
              <h1 key={trade.item}>{trade.to}</h1>
            ))}
      </div>
    </div>
  );
};

export default Trades;
