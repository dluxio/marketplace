/* eslint-disable @next/next/no-img-element */
import React from "react";

import { tokenColors } from "../constants";

type CoinCardProps = {
  coin: any;
};
export const CoinCard = ({ coin }: CoinCardProps) => {
  return (
    <div
      className="border shadow-xl h-auto border-transparent rounded-xl px-2 py-3 text-white"
      style={{ backgroundColor: tokenColors[coin.id] }}
    >
      <div className="flex flex-col lg:flex-row justify-between items-center mr-4">
        <div className="flex flex-col lg:flex-row items-center gap-8 ml-4">
          <img
            src={coin.image.large}
            alt="coin-image"
            width={50}
            height={50}
            className="rounded-full"
          />
          <h1 className="text-2xl">{coin.name}</h1>
        </div>
        <div>
          <h1
            className={`${
              coin.market_data.price_change_percentage_1h_in_currency.usd > 0
                ? "text-green-400"
                : "text-red-400"
            }`}
          >
            {coin.market_data.price_change_percentage_1h_in_currency.usd}%
          </h1>
        </div>
      </div>
      <div className="flex w-full justify-center items-center">
        <h1 className="text-2xl">${coin.market_data.current_price.usd}</h1>
      </div>
    </div>
  );
};
