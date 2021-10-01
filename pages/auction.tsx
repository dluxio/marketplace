import React, { useEffect, useState } from 'react';

import { AuctionNFTcard } from '../components';

const Tools = () => {
  const [auctionHouseNFT, setAuctionHouseNFT] = useState<any>([]);

  useEffect(() => {
    fetch('https://token.dlux.io/api/auctions')
      .then((response) => response.json())
      .then((data) => {
        setAuctionHouseNFT(data.result);
      });
  }, []);

  return (
    <div className="mx-2 sm:mx-10">
      <title>Auction house</title>
      <h1 className="text-white mt-10 mb-5 text-3xl font-bold">
        Auction house
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-5">
        {auctionHouseNFT.length &&
          auctionHouseNFT.map((nft: any) => (
            <AuctionNFTcard key={nft.uid} nft={nft} />
          ))}
      </div>
    </div>
  );
};

export default Tools;
