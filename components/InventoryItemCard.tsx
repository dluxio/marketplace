import React from 'react';

type InventoryNFTProps = {
  nft: any;
};

export const InventoryItemCard = ({ nft }: InventoryNFTProps) => {
  return (
    <div>
      <h1>{nft.uid}</h1>
    </div>
  );
};
