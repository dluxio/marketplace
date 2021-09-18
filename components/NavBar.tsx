import React, { useState } from 'react';

import { useRecoilState } from 'recoil';
import { currentScreenState, userState } from '../atoms';

import { ImCross } from 'react-icons/im';

import { useRouter } from 'next/router';

export const NavBar = () => {
  const [selectedPage, setSelectedPage] = useRecoilState(currentScreenState);
  const [signing, setSigning] = useState(false);
  const [user, setUser] = useRecoilState(userState);
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
    setSigning(true);
  };

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
          className={`${selectedPage === 'tools' && 'selected'} link`}
          onClick={() => handleNavClick('tools')}
        >
          Tools
        </p>
        <p
          className={`${selectedPage === 'settings' && 'selected'} link`}
          onClick={() => handleNavClick('settings')}
        >
          Settings
        </p>
      </div>
      <div onClick={handleSignIn} className="flex mr-5 link">
        <h1>Login</h1>
      </div>
      {signing && (
        <div className="absolute left-0 top-0 w-full flex justify-center items-center h-full bg-gray-700 opacity-75 z-40">
          <button className="m-5 absolute top-0 left-0">
            <ImCross
              size={25}
              color="#fff"
              opacity={100}
              onClick={() => setSigning(false)}
            />
          </button>
          <div className="">
            <div className="rounded-xl p-5 bg-black">
              <h1>To be done</h1>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
