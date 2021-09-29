import React, { useState, useEffect } from 'react';

import { useRecoilValue } from 'recoil';
import { userState, inventoryNavState } from '../atoms';

import { InventoryItemCard, InventoryNav, NftDetails } from '../components';

import axios from 'axios';
import { useRouter } from 'next/router';
import { MintTokenScreen } from '../components/MintTokenScreen';
import { CryptoScreen } from '../components/CryptoScreen';

const Inventory = () => {
  const router = useRouter();
  const user: any = useRecoilValue(userState);
  const inventoryPage = useRecoilValue(inventoryNavState);
  const [nftDetail, setNftDetail] = useState({});
  const [inventoryNFTs, setInventoryNFTs] = useState([]);
  const isLogged = user === null ? false : true;

  const handleNftClick = (nft: any) => {
    router.push('#details');
    setNftDetail(nft);
  };

  useEffect(() => {
    if (isLogged) {
      const name = user.name;
      axios.get(`https://token.dlux.io/api/nfts/${name}`).then((response) => {
        setInventoryNFTs(response.data.result);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (inventoryNFTs.length) {
      setNftDetail(inventoryNFTs[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inventoryNFTs]);

  return (
    <div>
      <InventoryNav />
      {isLogged ? (
        <div className="p-10 sm:p-0">
          {inventoryPage === 'mint' && <MintTokenScreen />}
          {inventoryPage === 'nft' && (
            <div className="flex h-auto flex-col gap-8 sm:flex-row">
              <div className="w-full">
                <div className="grid grid-cols-1 grid-row-auto sm:grid-cols-4 w-3/4 gap-4 mx-10">
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
              <div id="details" className="w-full mx-auto sm:mx-10">
                <NftDetails nft={nftDetail} />
              </div>
            </div>
          )}
          {inventoryPage === 'tokens' && <CryptoScreen />}
        </div>
      ) : (
        <div className="flex justify-center items-center h-80 w-full text-white text-2xl">
          <h1>Please log in</h1>
        </div>
      )}
    </div>
  );
};

export default Inventory;
