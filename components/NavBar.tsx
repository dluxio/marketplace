import React, { useState } from 'react';

import { AccountWidget } from './';

import { useRecoilState } from 'recoil';
import { currentScreenState } from '../atoms/currentScreen';

import { useRouter } from 'next/router';

export const NavBar = () => {
  const [selectedPage, setSelectedPage] = useRecoilState(currentScreenState);
  const router = useRouter();

  const handleNavClick = (pageName: string) => {
    if (pageName !== '') {
      console.log(pageName);
      setSelectedPage(pageName);
    } else {
      setSelectedPage('market');
    }
    router.push('/' + pageName);
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
      <div>
        <AccountWidget />
      </div>
    </div>
  );
};
