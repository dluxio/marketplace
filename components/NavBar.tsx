import React, { useEffect, useState } from 'react';

import { useRecoilValue } from 'recoil';
import { userState } from '../atoms';

import { Login } from './Login';

import { useRouter } from 'next/router';

export const NavBar = () => {
  const [signing, setSigning] = useState(false);
  const user: any = useRecoilValue(userState);
  const router = useRouter();
  const url = router.pathname.split('/')[1];

  useEffect(() => {
    if (user) {
      setSigning(false);
    }
  }, [user]);

  return (
    <div className="bg-black text-white px-5 font-normal py-3 pb-0 flex justify-between">
      <div className="flex gap-10 flex-grow justify-center">
        <p
          className={`${url === '' && 'selected'} link`}
          onClick={() => router.push('/')}
        >
          Market
        </p>
        <p
          className={`${
            (url === 'inventory' || url === 'create-nft') && 'selected'
          } link`}
          onClick={() => router.push('/inventory')}
        >
          Inventory
        </p>
        <p
          className={`${url === 'auction' && 'selected'} link`}
          onClick={() => router.push('/auction')}
        >
          Auction house
        </p>
        <p
          className={`${url === 'listings' && 'selected'} link`}
          onClick={() => router.push('/listings')}
        >
          Listings
        </p>
      </div>
      {user && (
        <div className="flex">
          <h1>{user.name}</h1>
        </div>
      )}
      {!user && (
        <div onClick={() => setSigning(true)} className="flex mr-5 link">
          <h1>Login</h1>
        </div>
      )}
      {signing && <Login handleClose={() => setSigning(false)} />}
    </div>
  );
};
