import React from 'react';

import { useRecoilState } from 'recoil';
import { FaBitcoin } from 'react-icons/fa';
import { MdStars } from 'react-icons/md';
import { inventoryNavState } from '../atoms';

export const InventoryNav = () => {
  const [marketNavSelected, setMarketNavSelected] =
    useRecoilState(inventoryNavState);
  return (
    <div className="flex mx-10 my-10 text-white gap-8 text-xl">
      <div
        onClick={() => setMarketNavSelected('tokens')}
        className={`flex flex-col items-center cursor-pointer ${
          marketNavSelected === 'tokens' && 'border-b-2 border-blue-500'
        }`}
      >
        <FaBitcoin size={25} color="#fff" />
        <p className="text-md mt-1">Tokens</p>
      </div>
      <div
        onClick={() => setMarketNavSelected('nft')}
        className={`flex flex-col items-center cursor-pointer ${
          marketNavSelected === 'nft' && 'border-b-2 border-blue-500'
        }`}
      >
        <MdStars size={25} color="#fff" />
        <p className="text-md mt-1">NFTs</p>
      </div>
    </div>
  );
};
