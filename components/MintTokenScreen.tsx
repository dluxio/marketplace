import React, { useEffect, useState } from 'react';

import { TokenCard } from './TokenCard';

export const MintTokenScreen = () => {
  const [mintTokens, setMintTokens] = useState([]);
  useEffect(() => {
    fetch('https://token.dlux.io/api/mintauctions')
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setMintTokens(data.result);
      });
  }, []);

  return (
    <div>
      {mintTokens.map((token: any[]) => (
        <TokenCard
          key={'_' + Math.random().toString(36).substr(2, 9)}
          token={token}
        />
      ))}
    </div>
  );
};
