import React from "react";

import { useRecoilState } from "recoil";
import { FaDollarSign } from "react-icons/fa";
import { MdSwapHoriz, MdSwapVerticalCircle } from "react-icons/md";
import { GiToken } from "react-icons/gi";
import { MdStars } from "react-icons/md";
import { GoPlus } from "react-icons/go";
import { inventoryNavState } from "../atoms";
import { useLanguageQuery, useTranslation } from "next-export-i18n";

import Link from "next/link";
import router from "next/router";

export const InventoryNav = () => {
  const { t } = useTranslation();
  const [query] = useLanguageQuery();
  const [marketNavSelected, setMarketNavSelected] =
    useRecoilState(inventoryNavState);

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
