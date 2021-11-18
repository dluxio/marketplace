import React, { useEffect, useState } from "react";

import axios from "axios";
import { handleSellCancel, NFTBuy, toBase64 } from "../utils";
import { FaMoneyBillAlt, FaQuestion } from "react-icons/fa";
import { useRecoilState, useRecoilValue } from "recoil";
import { apiLinkState, broadcastState, prefixState, userState } from "../atoms";

type FTCardProps = {
  ft: {
    set: string;
    script: string;
    price: { precision: number; amount: number };
    by: string;
    uid: string;
  };
};

export const FTCard = ({ ft }: FTCardProps) => {
  const { set, script } = ft;
  const [colors, setColors] = useState<any>([]);
  const [randomUID, setRandomUID] = useState("==");
  const [_braodcasts, setBroadcasts] = useRecoilState<any>(broadcastState);
  const user: any = useRecoilValue(userState);
  const apiLink: string = useRecoilValue(apiLinkState);
  const prefix: string = useRecoilValue(prefixState);

  const id = "_" + Math.random().toString(36).substr(2, 9);

  const randomUIDGen = (setData: any) => {
    const num = Math.round(Math.random() * (setData.max - (setData.min || 0)));
    const UID = toBase64(num);
    setRandomUID(UID);
  };

  useEffect(() => {
    axios.get(`${apiLink}api/set/${set}`).then(({ data }) => {
      setInterval(() => {
        randomUIDGen(data.set);
      }, 1000);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleBuy = async () => {
    const response: any = await NFTBuy(
      user.name,
      {
        set,
      },
      prefix
    );
    if (response) {
      if (response.success) {
        setBroadcasts((prevState: any) => [...prevState, response]);
      }
    }
  };

  const handleTakeBack = async () => {
    const response: any = await handleSellCancel(
      { set: ft.set, uid: ft.uid, kind: "ft" },
      user.name,
      prefix
    );
    if (response) {
      if (response.success) {
        setBroadcasts((prevState: any) => [...prevState, response]);
      }
    }
  };

  useEffect(() => {
    axios
      .get(`https://ipfs.io/ipfs/${script}?${randomUID}`)
      .then(({ data }) => {
        const code = `(//${data}\n)("${randomUID}")`;
        const SVG = eval(code);

        if (document.getElementById(`image-${set}-${id}`)) {
          document.getElementById(`image-${set}-${id}`)!.innerHTML = SVG.HTML;
        }
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [randomUID]);

  useEffect(() => {
    axios
      .get(`https://ipfs.io/ipfs/${ft.script}?${randomUID}`)
      .then(({ data }) => {
        const code = `(//${data}\n)("${ft.uid}")`;
        const SVG = eval(code);
        setColors([SVG.set.Color1, SVG.set.Color2]);
      });
  }, []);

  return (
    <div className="border shadow-xl h-auto border-transparent bg-gray-700 rounded-xl  text-white flex flex-col">
      <h1
        className="text-center w-full rounded-t-xl font-black py-2 text-xl"
        style={{
          background: `linear-gradient(to bottom,  ${colors[0]} 0%,${colors[1]} 100%)`,
        }}
      >
        {set}
      </h1>
      <div className="py-5">
        <div className="relative">
          <div className="bg-gray-700 absolute top-0 w-full h-full bg-opacity-70 flex justify-center items-center">
            <FaQuestion size={60} color="#fff" />
          </div>
          <div id={`image-${set}-${id}`} className="w-1/2 mx-auto"></div>
        </div>
      </div>
      <div className="px-5 py-4 w-full flex flex-col justify-between items-center">
        <h1>By: {ft.by}</h1>
        <h1>
          Price:{" "}
          <strong>
            {parseFloat(
              (+ft.price.amount / Math.pow(10, ft.price.precision)).toString()
            ).toFixed(ft.price.precision)}
          </strong>
        </h1>
        {ft.by !== user?.name ? (
          <button
            onClick={() => user && handleBuy()}
            className={`px-6 py-2 mt-2 rounded-xl flex items-center gap-2 ${
              !user && "cursor-not-allowed"
            }`}
            style={{
              background: `linear-gradient(to bottom,  ${colors[0]} 0%,${colors[1]} 100%)`,
            }}
          >
            Buy
            <FaMoneyBillAlt />
          </button>
        ) : (
          <button
            onClick={handleTakeBack}
            className={`px-3 py-2 mt-2 rounded-xl flex items-center gap-2 ${
              !user && "cursor-not-allowed"
            }`}
            style={{ backgroundColor: "orange" }}
          >
            Take back
          </button>
        )}
      </div>
    </div>
  );
};
