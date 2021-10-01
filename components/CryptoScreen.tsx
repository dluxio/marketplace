import React, { useEffect, useState } from 'react';

import { useRecoilValue } from 'recoil';
import { userState } from '../atoms';

import axios from 'axios';
import { BalanceCard } from './BalanceCard';

export const CryptoScreen = ({}) => {
  const [dluxBal, setDluxBal] = useState(0);
  const [hiveBal, setHiveBal] = useState(0);
  const user: any = useRecoilValue(userState);

  useEffect(() => {
    setHiveBal(parseFloat(user.balance.split(' ')[0]));

    axios
      .get(`https://token.dlux.io/@${user.name}`)
      .then(({ data }) => setDluxBal(parseFloat(data.balance)));
  }, [user]);

  return (
    <div className="w-full">
      <h1 className="text-white text-xl mx-10 my-2">Balances</h1>
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-5 px-10">
        <BalanceCard currency="DLUX" balance={dluxBal} />
        <BalanceCard currency="HIVE" balance={hiveBal} />
      </div>
    </div>
  );
};
