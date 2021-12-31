import React, { useEffect, useState } from "react";

import dayjs from "dayjs";
import objectSupport from "dayjs/plugin/objectSupport";
dayjs.extend(objectSupport);

import { FaMoneyBillAlt } from "react-icons/fa";

import { useRecoilState, useRecoilValue } from "recoil";
import { userState, broadcastState, prefixState } from "../../atoms";
import { AuctionDetail } from "../Modals/Detail";
import { useTranslation } from "next-export-i18n";

import axios from "axios";

import { handleSellCancel, NFTBuy } from "../../utils";
import { useRouter } from "next/router";

type NftCardProp = {
  nft: any;
};

export const NftCard = ({ nft }: NftCardProp) => {
  const [showInfo, setShowInfo] = useState(false);
  const [colors, setColors] = useState<any>([]);
  const user: any = useRecoilValue(userState);
  const prefix: string = useRecoilValue(prefixState);
  const router = useRouter();
  const [_broadcasts, setBroadcasts] = useRecoilState<any>(broadcastState);
  const { t } = useTranslation();

  useEffect(() => {
    axios
      .get(`https://ipfs.io/ipfs/${nft.script}?${nft.uid}`)
      .then(({ data }) => {
        const code = `(//${data}\n)("${nft.uid}")`;
        const SVG = eval(code);
        if (document.getElementById(`image-${nft.set}-${nft.uid}`)) {
          document.getElementById(`image-${nft.set}-${nft.uid}`)!.innerHTML =
            SVG.HTML;
        }
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nft]);

  useEffect(() => {
    axios
      .get(`https://ipfs.io/ipfs/${nft.script}?${nft.uid}`)
      .then(({ data }) => {
        const code = `(//${data}\n)("${nft.uid}")`;
        const SVG = eval(code);
        setColors([SVG.set.Color1, SVG.set.Color2]);
      });
  }, []);

  const handleBuy = async () => {
    const response: any = await NFTBuy(user.name, {
      uid: nft.uid,
      set: nft.set,
    });
    if (response) {
      if (response.success) {
        setBroadcasts((prevState: any) => [...prevState, response]);
      }
    }
  };

  const handleTakeBack = async () => {
    const response: any = await handleSellCancel(
      { set: nft.set, uid: nft.uid, kind: "nft" },
      user.name,
      prefix
    );
    if (response) {
      if (response.success) {
        setBroadcasts((prevState: any) => [...prevState, response]);
      }
    }
  };

  return (
    <>
      <div className="border shadow-xl h-auto border-transparent bg-gray-700 rounded-xl  text-white flex flex-col">
        <h1
          className="cursor-pointer text-center w-full rounded-t-xl font-black py-2 text-xl"
          style={{
            background: `linear-gradient(to bottom,  ${colors[0]} 0%,${colors[1]} 100%)`,
          }}
          onClick={() => router.push(`/set/${nft.set}`)}
        >
          {nft.set}
        </h1>
        <div className="py-5">
          <div
            onClick={() => setShowInfo(true)}
            className="py-5 text-center cursor-pointer"
          >
            <div
              id={`image-${nft.set}-${nft.uid}`}
              className="w-1/2 flex justify-center mx-auto"
            ></div>
            <h1 className="pt-2 text-xl">{nft.uid}</h1>
          </div>
        </div>
        <div className="px-5 py-4 w-full flex flex-col justify-between items-center">
          <div className="flex gap-1">
            <h1>{t("by")}: </h1>
            <h1
              className="hover:text-gray-300 cursor-pointer"
              onClick={() => router.push(`/@${nft.by}`)}
            >
              {nft.by}
            </h1>
          </div>
          <h1>
            {t("price")}:{" "}
            <strong>
              {parseFloat(
                (
                  nft.price.amount / Math.pow(10, nft.price.precision)
                ).toString()
              ).toFixed(nft.price.precision)}{" "}
              {nft.price.token}
            </strong>
          </h1>
          {nft.by !== user?.name ? (
            <button
              onClick={() => user && handleBuy()}
              className={`px-6 py-2 rounded-xl flex mt-2 items-center gap-2 ${!user && "cursor-not-allowed"
                }`}
              style={{
                background: `linear-gradient(to bottom,  ${colors[0]} 0%,${colors[1]} 100%)`,
              }}
            >
              {t("buy")}
              <FaMoneyBillAlt />
            </button>
          ) : (
            <button
              onClick={handleTakeBack}
              className={`px-3 py-2 rounded-xl mt-2 flex items-center gap-2 ${!user && "cursor-not-allowed"
                }`}
              style={{ backgroundColor: "orange" }}
            >
              {t("takeBack")}
            </button>
          )}
        </div>
      </div>
      {showInfo && (
        <AuctionDetail onExit={() => setShowInfo(false)} nft={nft} />
      )}
    </>
  );
};
