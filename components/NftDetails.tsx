import React, { useState, useEffect } from 'react';

type NftDetailProps = {
  nft: any;
};

export const NftDetails = ({ nft }: NftDetailProps) => {
  const [nftDetails, setNFTdetails] = useState({});

  useEffect(() => {
    const fetchDetails = () => {
      fetch(`https://token.dlux.io/api/nft/${nft.uid}`)
        .then((response) => response.json())
        .then((data) => setNFTdetails(data));
    };

    fetchDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="w-full text-center">
      <h1 className="text-white text-2xl font-bold">{nft.uid}</h1>
      <div className="m-5 flex flex-col justify-center gap-5 sm:mx-48">
        <button className="px-4 py-2 rounded-lg border-2 text-green-500 bg-transparent border-green-500 focus:outline-none focus:ring-2 focus:ring-green-700">
          Open
        </button>
        <button className="px-4 py-2 rounded-lg border-2 text-blue-500 bg-transparent border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-700">
          Sell
        </button>
        <button className="px-4 py-2 rounded-lg border-2 text-red-500 bg-transparent border-red-500 focus:outline-none focus:ring-2 focus:ring-red-700">
          Transfer
        </button>
      </div>
    </div>
  );
};
