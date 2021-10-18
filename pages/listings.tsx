import React, { useEffect } from 'react';

import { useRecoilValue } from 'recoil';
import { ftState, nftState } from '../atoms';

import { useRouter } from 'next/router';

import { NftCard } from '../components';
import { FTCard } from '../components/FTCard';

const Listings = () => {
  const nfts: any = useRecoilValue(nftState);
  const fts: any = useRecoilValue(ftState);
  const router = useRouter();
  const id = '_' + Math.random().toString(36).substr(2, 9);

  useEffect(() => {
    if (nfts === []) {
      router.push('/');
    } else if (fts === []) {
      router.push('/');
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nfts, fts]);

  return (
    <div className="mx-10 my-4 text-white font-medium">
      <title>Listings</title>
      <h1 className="text-3xl">Listings</h1>
      <div className="grid grid-cols-1 sm:grid-cols-4 xl:grid-cols-5 gap-8 my-5">
        {nfts && nfts.map((nft: any) => <NftCard key={nft.uid} nft={nft} />)}
        {fts && fts.map((ft: any) => <FTCard key={id} ft={ft} />)}
      </div>
    </div>
  );
};

export default Listings;
