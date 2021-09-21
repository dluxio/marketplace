import React, { useEffect, useState } from 'react';
import { setColors } from '../constants';

import Countdown from 'react-countdown';

import { GiTakeMyMoney } from 'react-icons/gi';

type AuctionCardProps = {
  nft: any;
};

export const AuctionNFTcard = ({ nft }: AuctionCardProps) => {
  const [showInfo, setShowInfo] = useState(false);

  useEffect(() => {
    fetch(`https://ipfs.io/ipfs/${nft.script}?${nft.uid}`)
      .then((response) => response.text())
      .then((data) => {
        const code = `(//${data}\n)("${nft.uid}")`;
        const SVG = eval(code);
        document.getElementById(
          `image-${nft.set}-${nft.uid}-auction`
        )!.innerHTML = SVG;
      });
  }, [nft]);

  return (
    <div className="border shadow-xl h-auto border-transparent bg-gray-700 rounded-xl  text-white flex flex-col">
      <h1
        className="text-center w-full rounded-t-xl font-black py-2 text-xl"
        style={{ backgroundColor: setColors[nft.set] }}
      >
        <Countdown date={Date.parse(nft.time)} />
      </h1>
      {/* {svg && <Image src={svg} alt="image" width={35} height={35} />} */}
      <div onClick={() => setShowInfo(true)} className="py-5 text-center">
        <div
          id={`image-${nft.set}-${nft.uid}-auction`}
          className="w-1/2 flex justify-center mx-auto"
        ></div>
        <h1 className="pt-2 text-xl">
          {nft.set}:{nft.uid}
        </h1>
      </div>
      <div className="px-2 sm:px-4 py-4 w-full flex justify-between items-center gap-3">
        <div>
          <h1>
            Price:{' '}
            <strong>
              {parseFloat(
                (
                  nft.price.amount / Math.pow(10, nft.price.precision)
                ).toString()
              ).toFixed(nft.price.precision)}{' '}
              {nft.price.token}
            </strong>
          </h1>
          <h1>
            Bids: <strong>{nft.bids}</strong>
          </h1>
        </div>
        <button
          className="px-6 py-2 rounded-xl flex items-center gap-2"
          style={{ backgroundColor: setColors[nft.set] }}
        >
          Bid
          <GiTakeMyMoney />
        </button>
      </div>
    </div>
  );
};
