import React from "react";

import { useRecoilState } from "recoil";
import { FaShoppingBag, FaRocket, FaNewspaper } from "react-icons/fa";
import { marketNavState } from "../atoms";

export const MarketNav = () => {
  const [marketNavSelected, setMarketNavSelected] =
    useRecoilState(marketNavState);
  return (
    <div className="flex justify-center sm:justify-start mx-10 my-10 text-white gap-8 text-xl">
      <div
        onClick={() => setMarketNavSelected("exchange")}
        className={`flex flex-col items-center cursor-pointer ${
          marketNavSelected === "exchange" && "border-b-2 border-blue-500"
        }`}
      >
        <FaShoppingBag size={25} color="#fff" />
        <p className="text-md mt-1">Market</p>
      </div>
      <div
        onClick={() => setMarketNavSelected("apps")}
        className={`flex flex-col items-center cursor-pointer ${
          marketNavSelected === "apps" && "border-b-2 border-blue-500"
        }`}
      >
        <FaRocket size={25} color="#fff" />
        <p className="text-md mt-1">Apps</p>
      </div>
      <div
        onClick={() => setMarketNavSelected("news")}
        className={`flex flex-col items-center cursor-pointer ${
          marketNavSelected === "news" && "border-b-2 border-blue-500"
        }`}
      >
        <FaNewspaper size={25} color="#fff" />
        <p className="text-md mt-1">News</p>
      </div>
    </div>
  );
};
