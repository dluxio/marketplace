import React, { useEffect, useState } from "react";

import { useRecoilState, useRecoilValue } from "recoil";
import { FaDollarSign, FaGift } from "react-icons/fa";
import { MdSwapVerticalCircle } from "react-icons/md";
import { GiToken } from "react-icons/gi";
import { MdStars } from "react-icons/md";
import { GoPlus } from "react-icons/go";
import { broadcastState, inventoryNavState, userState } from "../../atoms";
import { useLanguageQuery, useTranslation } from "next-export-i18n";

import router from "next/router";
import axios from "axios";
import { claim } from "../../utils";

export const InventoryNav = () => {
  const [canClaim, setCanClaim] = useState(false);
  const [gov, setGov] = useState(false);
  const { t } = useTranslation();
  const [query] = useLanguageQuery();
  const user = useRecoilValue<any>(userState);
  const [_broadcasts, setBroadcasts] = useRecoilState<any>(broadcastState);
  const [marketNavSelected, setMarketNavSelected] =
    useRecoilState(inventoryNavState);

  useEffect(() => {
    const checkClaim = () => {
      if (user) {
        axios
          .get(`https://dlux-test.herokuapp.com/@${user.name}`)
          .then(({ data }) => data.claim && true);
      }
      return false;
    };

    if (user) {
      setCanClaim(checkClaim());
    }
  }, [user]);

  const handleClaim = async () => {
    const response: any = await claim(user.name, gov);
    if (response) {
      if (response.success) {
        setBroadcasts((prevState: any) => [...prevState, response]);
      }
    }
  };

  return (
    <div className="flex flex-wrap items-center justify-between">
      <div className="flex mx-10 my-10 text-white gap-8 text-xl">
        <div
          onClick={() => setMarketNavSelected("nft")}
          className={`flex flex-col items-center cursor-pointer ${
            marketNavSelected === "nft" && "border-b-2 border-blue-500"
          }`}
        >
          <MdStars size={25} color="#fff" />
          <p className="text-md mt-1">NFTs</p>
        </div>
        <div
          onClick={() => setMarketNavSelected("mint")}
          className={`flex flex-col items-center cursor-pointer ${
            marketNavSelected === "mint" && "border-b-2 border-blue-500"
          }`}
        >
          <GiToken size={25} color="#fff" />
          <p className="text-md mt-1">Mint</p>
        </div>
        <div
          onClick={() => setMarketNavSelected("tokens")}
          className={`flex flex-col items-center cursor-pointer ${
            marketNavSelected === "tokens" && "border-b-2 border-blue-500"
          }`}
        >
          <FaDollarSign size={25} color="#fff" />
          <p className="text-md mt-1">{t("tokens")}</p>
        </div>
        <div
          onClick={() => setMarketNavSelected("dex")}
          className={`flex flex-col items-center cursor-pointer ${
            marketNavSelected === "dex" && "border-b-2 border-blue-500"
          }`}
        >
          <MdSwapVerticalCircle size={25} color="#fff" />
          <p className="text-md mt-1">DEX</p>
        </div>
        {canClaim && (
          <div className="flex gap-3 justify-center items-center">
            <button
              onClick={handleClaim}
              className="p-4 flex jsutify-center items-center bg-gradient-to-r from-green-400 to-blue-500 rounded-xl"
            >
              <FaGift size="1.5rem" />
            </button>
            <div className="flex gap-2 items-center justify-center">
              <input
                className="checkbox"
                type="checkbox"
                onChange={(e) => setGov(e.target.checked)}
              />
              <h1>Governance</h1>
            </div>
          </div>
        )}
      </div>
      <div className="flex mx-10 items-center text-white">
        <div
          onClick={() => router.push({ pathname: "/create-nft", query })}
          className={`flex flex-col items-center cursor-pointer`}
        >
          <GoPlus size={25} color="#fff" />
          <p className="text-md mt-1">{t("createNFT")}</p>
        </div>
      </div>
    </div>
  );
};
