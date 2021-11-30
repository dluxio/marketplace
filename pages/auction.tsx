import React, { useEffect, useState } from "react";

import { useRouter } from "next/router";

import { AuctionNFTcard } from "../components";
import axios from "axios";
import { AuctionFTcard } from "../components/AuctionFTCard";
import { apiLinkState } from "../atoms";
import { useRecoilValue } from "recoil";
import { useTranslation } from "next-export-i18n";

const Tools = () => {
  const router = useRouter();
  const apiLink = useRecoilValue(apiLinkState);
  const [showAuctionNFT, setShowAuctionNFT] = useState(true);
  const [auctionHouseNFT, setAuctionHouseNFT] = useState([]);
  const [auctionHouseFT, setAuctionHouseFT] = useState([]);
  const { t } = useTranslation();

  useEffect(() => {
    if (auctionHouseNFT === []) {
      router.push("/");
    } else if (auctionHouseFT === []) {
      router.push("/");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auctionHouseNFT]);

  useEffect(() => {
    const fetchAuction = () => {
      axios.get(`${apiLink}api/auctions`).then(({ data: { result } }) => {
        setAuctionHouseNFT(result);
      });

      axios.get(`${apiLink}api/mintauctions`).then(({ data: { result } }) => {
        setAuctionHouseFT(result);
      });
    };

    fetchAuction();
  }, []);

  return (
    <div className="mx-10 my-4">
      <title>{t("auctionHouse")}</title>
      <div className="flex justify-center">
        <button
          onClick={() => setShowAuctionNFT(true)}
          className={`p-2 ${
            showAuctionNFT && "bg-gray-800"
          } rounded-l-full bg-gray-700 text-white transition-all`}
        >
          NFTs
        </button>
        <button
          onClick={() => setShowAuctionNFT(false)}
          className={`p-2 ${
            !showAuctionNFT && "bg-gray-800"
          } rounded-r-full bg-gray-700 text-white transition-all`}
        >
          FTs
        </button>
      </div>
      <h1 className="text-white mt-10 mb-5 text-3xl font-semibold">
        {t("auctionHouse")}
      </h1>
      {showAuctionNFT ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
          {auctionHouseNFT &&
            auctionHouseNFT.map((nft: any) => (
              <AuctionNFTcard key={nft.uid} nft={nft} />
            ))}
        </div>
      ) : (
        auctionHouseFT && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
            {auctionHouseFT &&
              auctionHouseFT.map((ft: any) => (
                <AuctionFTcard key={ft.uid} ft={ft} />
              ))}
          </div>
        )
      )}
    </div>
  );
};

export default Tools;
