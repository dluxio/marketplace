import React, { useEffect, useState } from 'react';

import { useRecoilState, useRecoilValue } from 'recoil';
import { currentScreenState, userState } from '../atoms';

import { Login } from './Login';

import { useRouter } from 'next/router';

export const NavBar = () => {
  const [selectedPage, setSelectedPage] = useRecoilState(currentScreenState);
  const [signing, setSigning] = useState(false);
  const user: any = useRecoilValue(userState);
  const router = useRouter();

  const handleNavClick = (pageName: string) => {
    if (pageName !== '') {
      setSelectedPage(pageName);
    } else {
      setSelectedPage('market');
    }
    router.push('/' + pageName);
  };

  const handleSignIn = () => {
    // TODO: Check hive accounts, select found account
    setSigning(true);
  };

  useEffect(() => {
    if (user) {
      setSigning(false);
    }
  }, [user]);

  useEffect(() => {
    if (router.pathname === '/') {
      setSelectedPage('market');
    } else {
      const url = router.pathname.split('/')[1];
      setSelectedPage(url);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="bg-black text-white px-5 font-normal py-3 pb-0 flex justify-between">
      <div className="flex gap-10 flex-grow justify-center">
        <p
          className={`${selectedPage === 'market' && 'selected'} link`}
          onClick={() => handleNavClick('')}
        >
          Market
        </p>
        <p
          className={`${selectedPage === 'inventory' && 'selected'} link`}
          onClick={() => handleNavClick('inventory')}
        >
          Inventory
        </p>
        <p
          className={`${selectedPage === 'auction' && 'selected'} link`}
          onClick={() => handleNavClick('auction')}
        >
          Auction house
        </p>
        <p
          className={`${selectedPage === 'listings' && 'selected'} link`}
          onClick={() => handleNavClick('listings')}
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
        <div onClick={handleSignIn} className="flex mr-5 link">
          <h1>Login</h1>
        </div>
      )}
      {signing && <Login handleClose={() => setSigning(false)} />}
    </div>
  );
};
