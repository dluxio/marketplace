import React, { useEffect } from 'react';
import { setColors } from '../constants';
import { Countdown } from './Countdown';

import { GiTakeMyMoney } from 'react-icons/gi';

type AuctionCardProps = {
  nft: any;
};

export const AuctionNFTcard = ({ nft }: AuctionCardProps) => {
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
        <Countdown deadline={nft.time} />
      </h1>
      {/* {svg && <Image src={svg} alt="image" width={35} height={35} />} */}
      <div className="py-5">
        <div
          id={`image-${nft.set}-${nft.uid}-auction`}
          className="w-1/2 flex justify-center mx-auto"
        ></div>
      </div>
      <div className="px-2 py-4 w-full flex justify-center">
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
