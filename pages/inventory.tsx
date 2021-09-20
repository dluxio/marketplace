import React, { useState, useEffect } from 'react';

import { useRecoilValue } from 'recoil';
import { userState, inventoryNavState } from '../atoms';

import { InventoryItemCard, InventoryNav } from '../components';

import axios from 'axios';
import { NftCard } from '../components';

const Inventory = () => {
  //TODO: fix up the types in this entire project
  const user: any = useRecoilValue(userState);
  const inventoryPage = useRecoilValue(inventoryNavState);
  const [inventoryNFTs, setInventoryNFTs] = useState([]);
  const isLogged = user === null ? false : true;

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

  return (
    <div>
      <InventoryNav />
      {isLogged ? (
        <div>
          {inventoryPage === 'nft' ? (
            <div className="grid grid-cols-1 sm:grid-cols-4 w-4/5 gap-4 mx-10">
              {inventoryNFTs.map((nft: any) => {
                return (
                  <InventoryItemCard key={`${nft.set}_${nft.uid}`} nft={nft} />
                );
              })}
            </div>
          ) : (
            <div>
              <h1>Hello</h1>
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
