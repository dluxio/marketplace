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
  const id = '_' + Math.random().toString(36).substr(2, 9);

  if (nfts === []) router.push('/');

  useEffect(() => {
    const fetchNfts = async () => {
      axios
        .get('https://token.dlux.io/api/sales')
        .then(({ data: { result } }) => {
          setNfts(result);
        });

      axios
        .get('https://token.dlux.io/api/mintsales')
        .then(({ data: { result } }) => {
          console.log(result);
          setFts(result);
        });
    };

    fetchNfts();
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
      <div className="grid grid-cols-1 sm:grid-cols-4 xl:grid-cols-5 gap-8 my-5 w-full">
        {showNFTs
          ? nfts && nfts.map((nft: any) => <NftCard key={nft.uid} nft={nft} />)
          : fts && fts.map((ft: any) => <FTCard key={ft.uid} ft={ft} />)}
      </div>
    </div>
  );
};

export default Listings;
