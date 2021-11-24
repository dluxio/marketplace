import React from "react";

import { useRecoilState } from "recoil";
import { FaBitcoin } from "react-icons/fa";
import { GiToken } from "react-icons/gi";
import { MdStars } from "react-icons/md";
import { GoPlus } from "react-icons/go";
import { inventoryNavState } from "../atoms";
import { useTranslation } from "next-export-i18n";

import Link from "next/link";

export const InventoryNav = () => {
  const { t } = useTranslation();
  const [marketNavSelected, setMarketNavSelected] =
    useRecoilState(inventoryNavState);

  return (
    <div className="flex items-center justify-between">
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
          <FaBitcoin size={25} color="#fff" />
          <p className="text-md mt-1">{t("tokens")}</p>
        </div>
      </div>
      <div className="flex items-center mr-10 text-white">
        <Link href="/create-nft" passHref={true}>
          <div className={`flex flex-col items-center cursor-pointer`}>
            <GoPlus size={25} color="#fff" />
            <p className="text-md mt-1">{t("createNFT")}</p>
          </div>
        </Link>
      </div>
    </div>
  );
};
