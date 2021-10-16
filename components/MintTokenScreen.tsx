import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { userState } from '../atoms';

import { useRouter } from 'next/router';

import { TokenCard } from './TokenCard';

export const MintTokenScreen = () => {
  const [mintTokens, setMintTokens] = useState([]);
  const user: any = useRecoilValue(userState);
  const router = useRouter();

  useEffect(() => {
    if (user) {
      const name = user.name;
      axios.get(`https://token.dlux.io/api/nfts/${name}`).then((response) => {
        setMintTokens(response.data.mint_tokens);
      });
    } else {
      router.push('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-4 xl:grid-cols-6 gap-5 px-10">
        {mintTokens.length === 0 && (
          <div className="w-full flex justify-center items-center">
            <h1 className="text-white text-xl">
              You don&apos;t have any unminted tokens
            </h1>
          </div>
        )}
        {mintTokens.map((token: any) => (
          <div key={token.set}>
            <TokenCard
              key={'_' + Math.random().toString(36).substr(2, 9)}
              token={token}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
