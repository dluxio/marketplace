import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { TransferFormComp } from '.';

import { TokenCard } from './TokenCard';

export const MintTokenScreen = () => {
  const [mintTokens, setMintTokens] = useState([]);
  useEffect(() => {
    axios.get('https://token.dlux.io/api/mintauctions').then(({ data }) => {
      console.log(data);
      setMintTokens(data.result);
    });
  }, []);

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-5 px-10">
        {mintTokens.map((token: any) => (
          <div key={token.set}>
            <TokenCard
              key={'_' + Math.random().toString(36).substr(2, 9)}
              token={token}
              set={token.set}
              script={token.script}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
