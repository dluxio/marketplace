import React, { useState } from "react";
import { BiPaperPlane } from "react-icons/bi";

export const HiveInfo = ({ balance }: { balance: number }) => {
  const [send, setSend] = useState(false);

  return (
    <div className="flex flex-col mt-3 pt-3 border-t-2 border-gray-500">
      <div className="flex justify-between gap-5">
        <div>
          <h1>HIVE Token ({balance.toFixed(2)} Bal)</h1>
          <h1 className="text-gray-400 pt-2">
            HIVE is a DPoS blockchain with free transactions and a method to
            post and rate content.
          </h1>
        </div>
        <div className="flex items-center">
          <button
            onClick={() => setSend(true)}
            className="px-4 py-3 flex items-center gap-3 rounded-lg border-2 text-white bg-gradient-to-b from-white to-red-500 focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            Send
            <BiPaperPlane size="1.5rem" />
          </button>
        </div>
      </div>
    </div>
  );
};
