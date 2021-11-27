import React, { useState, useEffect } from "react";
import { Order } from "./Order";
import { DLUXInfocard } from "./DLUXInfocard";
import { OrderHistory } from "./OrderHistory";
import { useRecoilState, useRecoilValue } from "recoil";
import { apiLinkState, dlux_ccState } from "../../atoms";
import axios from "axios";

export const DEX = () => {
  const [coin, setCoin] = useState("HIVE");
  const [_cc, setCC] = useRecoilState(dlux_ccState);
  const apiLink = useRecoilValue(apiLinkState);

  useEffect(() => {
    axios.get(`${apiLink}api/protocol`).then(({ data }) => {
      setCC(data.multisig);
    });
  }, []);

  return (
    <div className="flex w-full justify-center">
      <div className="flex flex-col  justify-center items-center gap-9">
        <div className="flex justify-center">
          <button
            onClick={() => setCoin("HIVE")}
            className={`p-2 ${
              coin === "HIVE" && "bg-gray-800"
            } rounded-l-full bg-gray-700 text-white transition-all`}
          >
            HIVE
          </button>
          <button
            onClick={() => setCoin("HBD")}
            className={`p-2 ${
              coin === "HBD" && "bg-gray-800"
            } rounded-r-full bg-gray-700 text-white transition-all`}
          >
            HBD
          </button>
        </div>
        <div className="flex flex-col bg-gray-600 border-2 rounded-xl border-gray-800 p-5">
          <div className="flex justify-center">
            <DLUXInfocard />
          </div>
          <div className="flex justify-between gap-10">
            <Order coin={coin} type="buy" />
            <Order coin={coin} type="sell" />
          </div>
          <div className="flex gap-10">
            <OrderHistory coin={coin as "HIVE" | "HBD"} type="buy" />
            <OrderHistory coin={coin as "HIVE" | "HBD"} type="sell" />
          </div>
        </div>
      </div>
    </div>
  );
};
