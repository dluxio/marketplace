import React, { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { auctionState, ftAuctionState } from '../atoms';

import { useRouter } from 'next/router';

import { AuctionNFTcard } from '../components';

const Tools = () => {
  const router = useRouter();
  const auctionHouseNFT = useRecoilValue(auctionState);
  const auctionHouseFT = useRecoilValue(ftAuctionState);

  useEffect(() => {
    if (auctionHouseNFT === []) {
      router.push('/');
    } else if (auctionHouseFT === []) {
      router.push('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auctionHouseNFT]);

  return (
    <div className="mx-10 my-4">
      <title>Auction house</title>
      <h1 className="text-white mt-10 mb-5 text-3xl font-semibold">
        Auction house
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-4 xl:grid-cols-5 gap-5">
        {auctionHouseNFT &&
          auctionHouseNFT.map((nft: any) => (
            <AuctionNFTcard key={nft.uid} nft={nft} />
          ))}
      </div>
    </div>
  );
};

export default Tools;
