import React, { useEffect, useState } from 'react';

import { setColors } from '../constants';

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
      {mintTokens.map((tokens: any[]) => (
        <div
          key={'_' + Math.random().toString(36).substr(2, 9)}
          className="grid grid-cols-1 sm:grid-cols-6 gap-8 my-5 sm:mx-10"
        >
          {tokens.map((token) => (
            <div
              key={'_' + Math.random().toString(36).substr(2, 9)}
              className="bg-gray-700 rounded-xl text-white"
            >
              <div
                className="h-4 rounded-t-xl"
                style={{ backgroundColor: setColors[token.set] }}
              ></div>
              <div className="px-8 py-2">
                <h1>{token.set}</h1>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};
