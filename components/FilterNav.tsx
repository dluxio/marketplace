import React, { useEffect } from 'react';

type FilterNavProps = {
  nfts: any;
};

export const FilterNav = ({ nfts }: FilterNavProps) => {
  useEffect(() => {
    console.log(nfts);
  }, [nfts]);

  return (
    <div>
      <h1>Filter nav</h1>
    </div>
  );
};
