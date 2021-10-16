import React, { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { InventoryItemCard, NftDetails } from '.';
import { inventoryNFTState, userState } from '../atoms';

import axios from 'axios';
import { useRouter } from 'next/router';

export const NFTScreen = () => {
  const router = useRouter();
  const user: any = useRecoilValue(userState);
  const [nftDetail, setNftDetail] = useState<any>();
  const [inventoryNFTs, setInventoryNFTs] =
    useRecoilState<any>(inventoryNFTState);

  useEffect(() => {
    if (user) {
      const name = user.name;
      axios.get(`https://token.dlux.io/api/nfts/${name}`).then((response) => {
        setInventoryNFTs(response.data.result);
      });
    } else {
      router.push('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (inventoryNFTs.length) {
      setNftDetail(inventoryNFTs[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inventoryNFTs]);

  const handleNftClick = (nft: any) => {
    router.push('#details');
    setNftDetail(nft);
  };

  return (
    <div className="flex h-auto flex-col gap-8 sm:flex-row">
      <div className="w-full">
        <div className="grid grid-cols-1 grid-row-auto sm:grid-cols-2 xl:grid-cols-4 w-4/5 gap-4 mx-10">
          {inventoryNFTs.length === 0 && (
            <h1 className="text-white text-xl">You don&apos;t have any NFTs</h1>
          )}
          {inventoryNFTs.map((nft: any) => (
            <InventoryItemCard
              key={`${nft.set}_${nft.uid}`}
              nft={nft}
              onClick={() => {
                handleNftClick(nft);
              }}
            />
          ))}
        </div>
      </div>
      {nftDetail && (
        <div id="details" className="w-full mx-auto sm:mx-10">
          <NftDetails nft={nftDetail} />
        </div>
      )}
    </div>
  );
};
