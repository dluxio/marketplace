import React, { useState, useEffect } from 'react';

import { useRecoilValue } from 'recoil';
import { userState } from '../atoms';

import axios from 'axios';

const Inventory = () => {
  //TODO: fix up the types in this entire project
  const user: any = useRecoilValue(userState);
  const [inventoryNFTs, setInventoryNFTs] = useState([]);
  const [isLogged, setIsLogged] = useState(user === null ? false : true);

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
  }, []);

  return (
    <div>
      {isLogged ? (
        <div>
          {inventoryNFTs.map((nft: any) => {
            return <h1 key={nft.item}>{nft.item}</h1>;
          })}
        </div>
      ) : (
        <h1>Please log in</h1>
      )}
    </div>
  );
};

export default Inventory;
