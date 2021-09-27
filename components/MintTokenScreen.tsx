import React, { useEffect, useState } from 'react';
import { TransferFormComp } from '.';

import { TokenCard } from './TokenCard';

export const MintTokenScreen = () => {
  const [mintTokens, setMintTokens] = useState([]);
  useEffect(() => {
    fetch('https://token.dlux.io/api/mintauctions')
      .then((response) => response.json())
      .then((data) => {
        setMintTokens(data.result);
      });
  }, []);

  return (
    <div>
      {mintTokens.map((token: any) => (
        <div className="px-10" key={token.set}>
          <h1 className=" text-white py-5 text-2xl font-bold">{token.set}</h1>
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-5 mb-5 h-full">
            {token.items.map((item: any) => (
              <TokenCard
                key={'_' + Math.random().toString(36).substr(2, 9)}
                token={item}
                set={token.set}
                script={token.script}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
