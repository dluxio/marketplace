import React from 'react';

import { useRecoilValue } from 'recoil';
import { selectedCoinState } from '../atoms';

import { CryptoChart } from './CryptoChart';
import { TokenSelection } from './TokenSelection';

export const CryptoScreen = ({}) => {
  const selectedCoin = useRecoilValue(selectedCoinState);

  return (
    <div>
      <h1 className="text-white text-xl mx-10 my-2">
        Crypto change in the past 24hrs
      </h1>
      <CryptoChart selectedCoin={selectedCoin} />
      <h1 className="text-white text-xl my-2 mx-10">Crypto markets</h1>
      <TokenSelection />
    </div>
  );
};
