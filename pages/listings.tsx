import React, { useEffect, useState } from 'react';

import { useRecoilValue } from 'recoil';
import { nftState } from '../atoms';

import { NftCard } from '../components';

const Settings = () => {
  const [listings, setListings] = useState([]);
  const NFTs: any = useRecoilValue(nftState);

  useEffect(() => {
    setListings(NFTs.filter((nft: any) => nft.owner === 'ls'));
  }, [NFTs]);

  return (
    <div className="mx-10 my-4 text-white font-medium">
      <h1 className="text-3xl">Listings</h1>
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-8 my-5">
        {listings &&
          listings.map((nft: any) => <NftCard key={nft.uid} nft={nft} />)}
      </div>
    </div>
  );
};

export default Settings;
