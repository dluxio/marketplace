import React, { useEffect, useState } from 'react';

import { useRecoilValue } from 'recoil';
import { coinState } from '../atoms';
import { CryptoChart } from './CryptoChart';
import { TokenSelection } from './TokenSelection';

export const CryptoScreen = ({}) => {
  const [selectedCoin, setSelectedCoin] = useState({});

  return (
    <div>
      <h1 className="text-white text-xl mx-10 my-2">
        Crypto change in the past 24hrs
      </h1>
      <CryptoChart selectedCoin={selectedCoin} />
      <TokenSelection onClick={() => console.log('Select coin')} />
    </div>
  );
};
