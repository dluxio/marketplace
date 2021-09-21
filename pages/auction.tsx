import React, { useEffect, useState } from 'react';

import { AuctionNFTcard } from '../components';

const Tools = () => {
  const [auctionHouseNFT, setAuctionHouseNFT] = useState([]);

  useEffect(() => {
    fetch('https://token.dlux.io/api/auctions')
      .then((response) => response.json())
      .then((data) => setAuctionHouseNFT(data.result));
  }, []);

  return (
    <div className="mx-2 sm:mx-10">
      <h1 className="text-white my-10 text-2xl">Auction house</h1>
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-5">
        {auctionHouseNFT?.map((nft: any) => (
          <AuctionNFTcard key={`${nft.set}-${nft.uid}`} nft={nft} />
        ))}
      </div>
    </div>
  );
};

export default Tools;
