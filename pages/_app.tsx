import "../styles/globals.css";
import "tailwindcss/tailwind.css";

import type { AppProps } from "next/app";

import { NavBar } from "../components";
import React from "react";

import { RecoilRoot } from "recoil";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div>
      <RecoilRoot>
        <NavBar />
        <Component {...pageProps} />
      </RecoilRoot>
    </div>
  );
}
export default MyApp;
