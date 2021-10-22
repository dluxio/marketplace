import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { userState } from '../atoms';

import { useRouter } from 'next/router';
import axios from 'axios';
import { NFTTradeCard } from '../components/NFTTradeCard';
import { NFTManage } from '../components/NFTManage';

const Trades = () => {
  const [nft, setNFT] = useState(true);
  const [NFTtradesToRespond, setNFTTradesToRespond] = useState<[]>();
  const [FTtradesToRespond, setFTTradesToRespond] = useState<[]>();
  const [NFTtradesToManage, setNFTTradesToManage] = useState<[]>();
  const [FTtradesToManage, setFTTradesToManage] = useState<[]>();
  const [respond, setRespond] = useState(true);
  const router = useRouter();
  const user: any = useRecoilValue(userState);

  useEffect(() => {
    !user && router.replace('/');

    user &&
      axios
        .get(`https://token.dlux.io/api/trades/nfts/${user.name}`)
        .then(({ data }) => {
          setNFTTradesToRespond(
            data.result.filter((trade: any) => trade.from !== user.name)
          );
          setNFTTradesToManage(
            data.result.filter((trade: any) => trade.from === user.name)
          );
        });
    user &&
      axios
        .get(`https://token.dlux.io/api/trades/fts/${user.name}`)
        .then(({ data }) => {
          setFTTradesToRespond(
            data.result.filter((trade: any) => trade.from !== user.name)
          );
          setFTTradesToManage(
            data.result.filter((trade: any) => trade.from === user.name)
          );
        });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <div className="mx-10 my-4 text-white font-medium">
      <title>Trades</title>
      <div className="flex gap-4 justify-center">
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
        <div className="flex justify-center">
          <button
            onClick={() => setNFT(true)}
            className={`p-2 ${
              nft && 'bg-gray-800'
            } rounded-l-full bg-gray-700 text-white transition-all`}
          >
            NFTs
          </button>
          <button
            onClick={() => setNFT(false)}
            className={`p-2 ${
              !nft && 'bg-gray-800'
            } rounded-r-full bg-gray-700 text-white transition-all`}
          >
            FTs
          </button>
        </div>
      </div>
      <h1 className="text-3xl">Trades</h1>
      <div className="grid grid-cols-1 sm:grid-cols-4 xl:grid-cols-5 gap-8 my-5">
        {nft
          ? respond
            ? NFTtradesToRespond &&
              NFTtradesToRespond.map((trade: any) => (
                <NFTTradeCard key={trade.item} trade={trade} />
              ))
            : NFTtradesToManage &&
              NFTtradesToManage.map((trade: any) => (
                <NFTManage key={trade.item} trade={trade} />
              ))
          : respond
          ? FTtradesToRespond &&
            NFTtradesToRespond?.map((trade: any) => (
              <h1 key={trade.item}>{trade.to}</h1>
            ))
          : FTtradesToManage &&
            FTtradesToManage.map((trade: any) => (
              <h1 key={trade.item}>{trade.to}</h1>
            ))}
      </div>
    </div>
  );
};

export default Trades;
