import React, { useEffect, useState } from 'react';

import { useRecoilValue } from 'recoil';
import { nftState } from '../atoms';

import { NftCard, FilterNav } from '../components';

const Listings = () => {
  const nfts: any = useRecoilValue(nftState);

  return (
    <div className="mx-10 my-4 text-white font-medium">
      <FilterNav nfts={nfts} />
      <h1 className="text-3xl">Listings</h1>
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-8 my-5">
        {nfts && nfts.map((nft: any) => <NftCard key={nft.uid} nft={nft} />)}
      </div>
    </div>
  );
};

export default Listings;
