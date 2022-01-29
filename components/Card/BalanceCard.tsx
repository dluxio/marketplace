import React, { useEffect, useState } from "react";
import { SendDLUX } from "../Modals/SendForm";
import { GovModal } from "../Modals/GovModal";
import { AiOutlineCaretUp, AiOutlineCaretDown } from "react-icons/ai";
import { BiPaperPlane } from "react-icons/bi";

export const BalanceCard = ({
  currency,
  balance,
}: {
  currency: string;
  balance: number | { DLUX: number; GOV: number };
}) => {
  const [send, setSend] = useState(false);
  const [gov, setGov] = useState({ show: false, up: false });

  return (
    <div
      className={`bg-gray-700 w-full px-5 py-3 text-white  rounded-xl border-2 border-gray-800`}
    >
      {send && <SendDLUX handleClose={() => setSend(false)} />}
      {gov.show && (
        <GovModal
          handleClose={() => setGov({ ...gov, show: false })}
          up={gov.up}
        />
      )}
      <div className="flex items-center justify-between">
        {currency === "DLUX" && (
          <img
            src="https://www.dlux.io/img/dlux-hive-logo-alpha.svg"
            width={45}
            height={45}
            alt="logo"
          />
        )}
        {currency === "HIVE" && (
          <img
            src="https://cryptologos.cc/logos/hive-blockchain-hive-logo.png"
            width={45}
            height={45}
            alt="logo"
          />
        )}
        <h1 className="text-xl mr-3">
          {currency === "HIVE"
            ? balance
            : ((balance as { DLUX: number; GOV: number }).DLUX / 1000).toFixed(
                2
              )}{" "}
          {currency}
        </h1>
      </div>
      {currency === "DLUX" && (
        <div className="flex flex-col mt-3 pt-3 border-t-2 border-gray-500">
          <div className="flex justify-between gap-5">
            <div>
              <h1>DLUX Token</h1>
              <h1 className="text-gray-400 pt-2">
                The utility token for content distribution and smart contracts,
                also called a smart media token (SMT)
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
        </div>
      )}
    </div>
  );
};
