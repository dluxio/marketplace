import React, { useEffect, useState } from 'react';

export const MintTokenScreen = () => {
  const [mintTokens, setMintTokens] = useState([]);
  useEffect(() => {
    fetch('https://token.dlux.io/api/mintauctions')
      .then((response) => response.json())
      .then((data) => setMintTokens(data.result));
  }, []);

  return (
    <div>
      <h1>Mint tokens</h1>
    </div>
  );
};
