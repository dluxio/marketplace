import React, { useEffect, useState } from 'react';

import { useRouter } from 'next/router';

import { AuctionNFTcard } from '../components';
import axios from 'axios';

const Tools = () => {
  const router = useRouter();
  const [showAuctionNFT, setShowAuctionNFT] = useState(true);
  const [auctionHouseNFT, setAuctionHouseNFT] = useState([]);
  const [auctionHouseFT, setAictonHouseFT] = useState([]);

  useEffect(() => {
    if (auctionHouseNFT === []) {
      router.push('/');
    } else if (auctionHouseFT === []) {
      router.push('/');
    }

    const fetchAuction = () => {
      axios
        .get('https://token.dlux.io/api/auctions')
        .then(({ data: { result } }) => {
          setAuctionHouseNFT(result);
        });

      axios
        .get('https://token.dlux.io/api/mintauctions')
        .then(({ data: { result } }) => {
          setAictonHouseFT(result);
        });
    };

    fetchAuction();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auctionHouseNFT]);

  return (
    <div className="mx-10 my-4">
      <title>Auction house</title>
      <div className="flex justify-center">
        <button
          onClick={() => setShowAuctionNFT(true)}
          className={`p-2 ${
            showAuctionNFT && 'bg-gray-800'
          } rounded-l-full bg-gray-700 text-white transition-all`}
        >
          NFTs
        </button>
        <button
          onClick={() => setShowAuctionNFT(false)}
          className={`p-2 ${
            !showAuctionNFT && 'bg-gray-800'
          } rounded-r-full bg-gray-700 text-white transition-all`}
        >
          FTs
        </button>
      </div>
      <h1 className="text-white mt-10 mb-5 text-3xl font-semibold">
        Auction house
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-4 xl:grid-cols-5 gap-5">
        {showAuctionNFT
          ? auctionHouseNFT &&
            auctionHouseNFT.map((nft: any) => (
              <AuctionNFTcard key={nft.uid} nft={nft} />
            ))
          : auctionHouseFT &&
            auctionHouseFT.map((ft: any) => <h1 key={ft.uid}>{ft.uid}</h1>)}
      </div>
    </div>
  );
};

export default Tools;
