import React, { useState, useEffect } from 'react';

import { useRecoilValue } from 'recoil';
import { userState } from '../atoms';

import Image from 'next/image';

import axios from 'axios';

const Inventory = () => {
  //TODO: fix up the types in this entire project
  const user: any = useRecoilValue(userState);
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
      {isLogged ? (
        <div>
          {inventoryNFTs.map((nft: any) => {
            const image = `https://ipfs.io/ipfs/QmPsxgySUZibuojuUWCMQJpT2uZhijY4Cf7tuJKR8gpZqq?${nft.item}`;
            console.log(image);
            return (
              <div key={nft.item}>
                <h1>{nft.item}</h1>
                <Image src={image} alt="image" width={35} height={35} />
              </div>
            );
          })}
        </div>
      ) : (
        <h1>Please log in</h1>
      )}
    </div>
  );
};

export default Inventory;
