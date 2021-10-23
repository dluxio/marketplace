import React, { useEffect, useState } from 'react';

import { useRouter } from 'next/router';

import { NftCard } from '../components';
import { FTCard } from '../components/FTCard';
import axios from 'axios';

const Listings = () => {
  const [showNFTs, setShowNFTs] = useState(true);
  const [nfts, setNfts] = useState([]);
  const [fts, setFts] = useState([]);
  const router = useRouter();

  if (nfts === []) router.push('/');

  useEffect(() => {
    const fetchListings = async () => {
      axios
        .get('https://token.dlux.io/api/sales')
        .then(({ data: { result } }) => {
          setNfts(result);
        });

      axios
        .get('https://token.dlux.io/api/mintsupply')
        .then(({ data: { result } }) => {
          console.log(result);
          setFts(result);
        });
    };

    fetchListings();
  }, []);

  return (
    <div className="mx-10 my-4 text-white font-medium">
      <title>Listings</title>
      <div className="flex justify-center">
        <button
          onClick={() => setShowNFTs(true)}
          className={`p-2 ${
            showNFTs && 'bg-gray-800'
          } rounded-l-full bg-gray-700 text-white transition-all`}
        >
          NFTs
        </button>
        <button
          onClick={() => setShowNFTs(false)}
          className={`p-2 ${
            !showNFTs && 'bg-gray-800'
          } rounded-r-full bg-gray-700 text-white transition-all`}
        >
          FTs
        </button>
      </div>
      <h1 className="text-3xl">Listings</h1>
      {showNFTs
        ? nfts && (
            <div className="grid grid-cols-1 sm:grid-cols-4 xl:grid-cols-5 gap-8 my-5 w-full">
              {nfts.map((nft: any) => (
                <NftCard key={nft.uid} nft={nft} />
              ))}
            </div>
          )
        : fts &&
          fts.map((set: any) => (
            <div className="text-white mx-4" mx-5 key={set.set}>
              <h1 className="text-2xl font-semibold my-5">{set.set}</h1>
              <div className="grid grid-cols-1 sm:grid-cols-4 xl:grid-cols-5 gap-5">
                {set.sales.map((auction: any) => (
                  <FTCard key={`${auction.uid}-${auction.time}`} ft={auction} />
                ))}
              </div>
            </div>
          ))}
    </div>
  );
};

export default Listings;
