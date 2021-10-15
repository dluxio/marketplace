import React, { useEffect, useState } from 'react';

import { useRecoilState, useRecoilValue } from 'recoil';
import { userState, broadcastState } from '../atoms';

import { Login } from './Login';

import { useRouter } from 'next/router';
import { Spinner } from './Spinner';

export const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [signing, setSigning] = useState(false);
  const [user, setUser] = useRecoilState<any>(userState);
  const router = useRouter();
  const url = router.pathname.split('/')[1];
  const broadcasts: any = useRecoilValue(broadcastState);

  const handleLogout = () => setUser(null);

  const handleTrades = () => {
    router.push('/trades');
  };

  useEffect(() => {
    if (user) {
      setSigning(false);
    }
  }, [user]);

  useEffect(() => {
    const getUser = () => {
      const userStor = localStorage.getItem('user');
      if (userStor) {
        setUser(JSON.parse(userStor));
      }
    };

    if (!user) {
      getUser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="bg-black text-white px-5 font-normal py-3 pb-0 flex justify-between">
      <div className="flex gap-10 flex-grow justify-center">
        <p
          className={`${url === '' && 'selected'} navLink`}
          onClick={() => router.push('/')}
        >
          Home
        </p>
        <p
          className={`${
            (url === 'inventory' || url === 'create-nft') && 'selected'
          } ${user ? 'navLink' : 'text-gray-600 pb-2 cursor-not-allowed'}`}
          onClick={() => {
            if (user) {
              router.push('/inventory');
            }
          }}
        >
          Inventory
        </p>
        <p
          className={`${url === 'auction' && 'selected'} navLink`}
          onClick={() => router.push('/auction')}
        >
          Auction house
        </p>
        <p
          className={`${url === 'listings' && 'selected'} navLink`}
          onClick={() => router.push('/listings')}
        >
          Listings
        </p>
      </div>
      {user && (
        <div className="flex">
          <h1
            className="navLink"
            onClick={() => setIsOpen((prevState) => !prevState)}
          >
            {user.name}
          </h1>
          <div
            className={`${
              isOpen ? '' : 'hidden'
            } fixed bg-white top-14 right-2 px-2 pt-2 rounded-xl flex flex-col`}
          >
            <a onClick={handleTrades} className="btn">
              pending trades
            </a>
            <a className="btn" onClick={handleLogout}>
              Logout
            </a>
          </div>
        </div>
      )}
      {!user && (
        <div onClick={() => setSigning(true)} className="flex mr-5 navLink">
          <h1>Login</h1>
        </div>
      )}
      {signing && <Login handleClose={() => setSigning(false)} />}
      <div className={'fixed bottom-5 right-5 grid-cols-1'}>
        {broadcasts.map((broadcast: any) => (
          <Spinner key={broadcast.id} broadcast={broadcast} time={63} />
        ))}
      </div>
    </div>
  );
};
