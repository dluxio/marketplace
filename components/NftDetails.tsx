import React, { useState, useEffect } from 'react';

type NftDetailProps = {
  nft: any;
};

export const NftDetails = ({ nft }: NftDetailProps) => {
  const [nftDetails, setNFTdetails] = useState({});

  useEffect(() => {
    fetch(`https://token.dlux.io/api/nft/${nft.uid}`)
      .then((response) => response.json())
      .then((data) => console.log(data));
  }, [nft.uid]);

  return (
    <div className="w-full p-0 text-center">
      <div className="h-10" id={`image-${nft.set}-${nft.uid}`}></div>
      <h1 className="text-white text-2xl font-bold">{nft.uid}</h1>
    </div>
  );
};
