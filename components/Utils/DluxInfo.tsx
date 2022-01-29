import React, { useState } from "react";

import { AiOutlineCaretUp, AiOutlineCaretDown } from "react-icons/ai";
import { BiPaperPlane } from "react-icons/bi";
import { FaLock, FaUnlock } from "react-icons/fa";
import { GovModal } from "../Modals/GovModal";
import { Send } from "../Modals/SendForm";

export const DluxInfo = ({
  balance,
}: {
  balance: { DLUX: number; GOV: number };
}) => {
  const [send, setSend] = useState(false);
  const [gov, setGov] = useState({ show: false, up: false });
  const [showActions, setShowActions] = useState(false);

  return (
    <div className="flex flex-col mt-3 pt-3 border-t-2 border-gray-500">
      {send && (
        <Send
          currency="DLUX"
          balance={balance.DLUX / 1000}
          handleClose={() => setSend(false)}
        />
      )}
      {gov.show && (
        <GovModal
          balance={balance.GOV}
          handleClose={() => setGov({ ...gov, show: false })}
          up={gov.up}
        />
      )}
      <div className="flex justify-between gap-5">
        <div>
          <h1>DLUX Token ({(balance.DLUX / 1000).toFixed(2)} Bal)</h1>
          <h1 className="text-gray-400 pt-2">
            The utility token for content distribution and smart contracts, also
            called a smart media token (SMT)
          </h1>
        </div>
        <div className="flex items-center">
          <button
            onClick={() => setSend(true)}
            className="px-4 py-3 flex items-center gap-3 rounded-lg border-2 text-white bg-gradient-to-b from-pink-500 to-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            Send
            <BiPaperPlane size="1.5rem" />
          </button>
        </div>
      </div>
      <div className="flex justify-between gap-10 border-t-2 border-gray-600 mt-2 pt-2">
        <div>
          <h1>DLUX Governance ({(balance.GOV / 1000).toFixed(2)} Bal)</h1>
          <h1 className="text-gray-400 pt-2">
            Locked tokens used to determine concensus and earn rewards for
            running a node
          </h1>
          <h1 className="text-gray-400 pt-2">Benefits of DLUX Governance:</h1>
          <ul className="text-gray-400 pt-1 pl-3">
            <li>1. Provides liquid funds to DAO multi-sig wallet</li>
            <li>2. Ensures collateral for DEX escrow transactions</li>
            <li>3. Enables voting on proposed community measures</li>
            <li>4. 1 Week Lock | 4 Week Unlock | 1 Week Convert</li>
          </ul>
        </div>
        <div className="flex flex-col items-end">
          <button
            onClick={() => setShowActions(!showActions)}
            className="px-3 py-3 flex items-center gap-3 rounded-lg border-2 text-white bg-transparent border-gray-700 bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-700"
          >
            Actions{" "}
            {showActions ? <AiOutlineCaretUp /> : <AiOutlineCaretDown />}
          </button>
          {showActions && (
            <div className="bg-gray-600 rounded-xl p-3">
              <button
                onClick={() => setGov({ show: true, up: true })}
                className="flex justify-between items-center whitespace-nowrap gap-2 bg-gray-500 w-full px-2 py-1 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-700"
              >
                Lock GOV <FaLock />
              </button>
              <button
                onClick={() => setGov({ show: true, up: false })}
                className="flex mt-2 items-center whitespace-nowrap gap-2 bg-gray-500 w-full px-2 py-1 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-700"
              >
                Unlock GOV <FaUnlock />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
