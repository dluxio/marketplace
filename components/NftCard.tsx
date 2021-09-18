import React, { useEffect, useState } from 'react';

import dayjs from 'dayjs';
import objectSupport from 'dayjs/plugin/objectSupport';
dayjs.extend(objectSupport);

type NftCardProp = {
  nft: any;
};

export const NftCard = ({ nft }: NftCardProp) => {
  const [time, setTime] = useState(nft.time);
  const set = nft.item.split(':')[0];
  const name = nft.item.split(':')[1];

  useEffect(() => {
    setInterval(() => {
      setTime((prevState: number) => prevState - 1);
    }, 1000);
  }, []);

  return (
    <div className="border shadow-xl h-auto border-transparent bg-gray-700 rounded-xl px-2 py-4 text-white flex flex-col">
      {time >= 0 ? (
        <>
          <h1 className="text-center">
            {new Date(time * 1000).toISOString().substr(11, 8)}
          </h1>
          <div>
            <h1 className="text-2xl text-center">item: {name}</h1>
            <h1 className="text-2xl text-center">set: {set}</h1>
          </div>
        </>
      ) : (
        <h1>Auction ended</h1>
      )}
    </div>
  );
};
