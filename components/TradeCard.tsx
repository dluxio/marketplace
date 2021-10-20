import axios from 'axios';
import React, { useEffect } from 'react';

type TradeCardProps = {
  trade: {
    from: string;
    item: string;
    kind: string;
    price: number;
    script: string;
    set: string;
    to: string;
    uid: string;
  };
};

export const TradeCard = ({ trade }: TradeCardProps) => {
  useEffect(() => {
    axios
      .get(`https://ipfs.io/ipfs/${trade.script}?${trade.uid}`)
      .then(({ data }) => {
        const code = `(//${data}\n)("${trade.uid}")`;
        const SVG = eval(code);
        document.getElementById(
          `${trade.item}-${trade.from}-${trade.to}`
        )!.innerHTML = SVG.HTML;
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="rounded-xl border shadow-xl h-auto border-transparent bg-gray-700 text-white flex flex-col">
      <div className="text-center text-xl py-2 rounded-t-xl bg-black">
        <h1>{trade.from}</h1>
      </div>
      <div className="w-full flex justify-center py-2">
        <div
          id={`${trade.item}-${trade.from}-${trade.to}`}
          className="w-52"
        ></div>
      </div>
      <div className="text-center text-xl pb-2">{trade.item}</div>
      <div className="text-center text-md">
        Price: {(trade.price / 1000).toFixed(3)} DLUX
      </div>
      <div className="flex sm:justify-evenly pt-2 pb-4">
        <button className="px-3 py-1 rounded-lg border-2 text-white bg-green-500 border-green-600 focus:outline-none focus:ring-2 focus:ring-green-700">
          Accept
        </button>
        <button className="px-3 py-1 rounded-lg border-2 text-white bg-red-500 border-red-600 focus:outline-none focus:ring-2 focus:ring-red-700">
          Decline
        </button>
      </div>
    </div>
  );
};
