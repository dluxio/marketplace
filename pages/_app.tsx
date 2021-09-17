import '../styles/globals.css';
import 'tailwindcss/tailwind.css';

import type { AppProps } from 'next/app';

import { NavBar } from '../components';
import React from 'react';

import { RecoilRoot } from 'recoil';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <div>
        <NavBar />
        <Component {...pageProps} />
      </div>
    </RecoilRoot>
  );
}
export default MyApp;
