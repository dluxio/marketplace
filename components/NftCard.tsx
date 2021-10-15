import React, { useEffect } from 'react';

import dayjs from 'dayjs';
import objectSupport from 'dayjs/plugin/objectSupport';
dayjs.extend(objectSupport);

import { FaMoneyBillAlt } from 'react-icons/fa';
import { setColors } from '../constants';

import { useRecoilValue } from 'recoil';
import { userState } from '../atoms';

import { NFTBuy } from '../utils';

type NftCardProp = {
  nft: any;
};

export const NftCard = ({ nft }: NftCardProp) => {
  const user: any = useRecoilValue(userState);

  useEffect(() => {
    fetch(`https://ipfs.io/ipfs/${nft.script}?${nft.uid}`)
      .then((response) => response.text())
      .then((data) => {
        const code = `(//${data}\n)("${nft.uid}")`;
        const SVG = eval(code);
        console.log(SVG);
        document.getElementById(`image-${nft.set}-${nft.uid}`)!.innerHTML =
          SVG.HTML;
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleBuy = async () => {
    await NFTBuy(user.name, { uid: nft.uid, set: nft.set });
  };

  return (
    <div className="border shadow-xl h-auto border-transparent bg-gray-700 rounded-xl  text-white flex flex-col">
      <h1
        className="text-center w-full rounded-t-xl font-black py-2 text-xl"
        style={{ backgroundColor: setColors[nft.set] }}
      >
        {nft.uid}
      </h1>
      <div className="py-5">
        <div
          id={`image-${nft.set}-${nft.uid}`}
          className="w-1/2 flex justify-center mx-auto"
        ></div>
      </div>
      <div className="px-5 py-4 w-full flex justify-between items-center">
        <h1>
          Price:{' '}
          <strong>
            {parseFloat(
              (nft.price.amount / Math.pow(10, nft.price.precision)).toString()
            ).toFixed(nft.price.precision)}{' '}
          </strong>
        </h1>
        <button
          onClick={() => user && handleBuy()}
          className={`px-6 py-2 rounded-xl flex items-center gap-2 ${
            !user && 'cursor-not-allowed'
          }`}
          style={{ backgroundColor: user ? setColors[nft.set] : 'gray' }}
        >
          Buy
          <FaMoneyBillAlt />
        </button>
      </div>
    </div>
  );
};
