import React, { useEffect } from 'react';

import dayjs from 'dayjs';
import objectSupport from 'dayjs/plugin/objectSupport';
dayjs.extend(objectSupport);

import { setColors } from '../constants';

type NftCardProp = {
  nft: any;
};

export const NftCard = ({ nft }: NftCardProp) => {
  useEffect(() => {
    console.log(nft);
    fetch(`https://ipfs.io/ipfs/${nft.script}?${nft.uid}`)
      .then((response) => response.text())
      .then((data) => {
        const code = `(//${data}\n)("${nft.uid}")`;
        const SVG = eval(code);
        document.getElementById(`image-${nft.set}-${nft.uid}`)!.innerHTML = SVG;
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="border shadow-xl h-auto border-transparent bg-gray-700 rounded-xl  text-white flex flex-col">
      <h1
        className="text-center w-full rounded-t-xl font-black py-2 text-xl"
        style={{ backgroundColor: setColors[nft.set] }}
      >
        {nft.uid}
      </h1>
      {/* {svg && <Image src={svg} alt="image" width={35} height={35} />} */}
      <div className="py-5">
        <div
          id={`image-${nft.set}-${nft.uid}`}
          className="w-1/2 flex justify-center mx-auto"
        ></div>
      </div>
      <div className="px-2 py-4 w-full flex justify-center">
        <button
          className="px-6 py-2 rounded-xl"
          style={{ backgroundColor: setColors[nft.set] }}
        >
          Buy
        </button>
      </div>
    </div>
  );
};
