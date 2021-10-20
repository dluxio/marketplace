import React from 'react';

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
  return (
    <div className="rounded-xl border shadow-xl h-auto border-transparent bg-gray-700 text-white flex flex-col">
      <div className="text-center text-xl py-2 rounded-t-xl bg-black">
        <h1>{trade.from}</h1>
      </div>
      <div className="flex sm:justify-evenly py-2">
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
