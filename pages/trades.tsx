import React, { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { userState } from '../atoms';

import { useRouter } from 'next/router';

const Trades = () => {
  const router = useRouter();
  const user: any = useRecoilValue(userState);

  useEffect(() => {
    !user && router.replace('/');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <div className="w-full flex justify-center items-center text-white text-xl z-0">
      <h1>Coming soon</h1>
    </div>
  );
};

export default Trades;
