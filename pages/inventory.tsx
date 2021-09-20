import React, { useState, useEffect } from 'react';

import { useRecoilValue } from 'recoil';
import { userState, inventoryNavState } from '../atoms';

import { InventoryItemCard, InventoryNav, NftDetails } from '../components';

import axios from 'axios';
import { useRouter } from 'next/router';

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
    const fetchNFTs = async () => {
      if (isLogged) {
        const name = user.name;
        await axios
          .get(`https://token.dlux.io/api/nfts/${name}`)
          .then((response) => {
            console.log(response.data.result);
            setInventoryNFTs(response.data.result);
          });
      }
    };

    fetchNFTs();
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
        <div>
          {inventoryPage === 'nft' ? (
            <div className="flex h-auto flex-col sm:flex-row">
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
              <div id="details" className="w-full">
                <NftDetails nft={nftDetail} />
              </div>
            </div>
          ) : (
            <div>
              <h1>To be done</h1>
            </div>
          )}
        </div>
      ) : (
        <h1>Please log in</h1>
      )}
    </div>
  );
};

export default Inventory;
