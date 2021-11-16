import React, { useEffect, useState } from "react";

import { useRouter } from "next/router";

import { AuctionNFTcard } from "../components";
import axios from "axios";
import { AuctionFTcard } from "../components/AuctionFTCard";

const Tools = () => {
  const router = useRouter();
  const [showAuctionNFT, setShowAuctionNFT] = useState(true);
  const [auctionHouseNFT, setAuctionHouseNFT] = useState([]);
  const [auctionHouseFT, setAuctionHouseFT] = useState([]);

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
      axios
        .get("https://token.dlux.io/api/auctions")
        .then(({ data: { result } }) => {
          setAuctionHouseNFT(result);
        });

      axios
        .get("https://token.dlux.io/api/mintsupply")
        .then(({ data: { result } }) => {
          setAuctionHouseFT(result);
        });
    };

    fetchAuction();
  }, []);

  return (
    <div className="mx-10 my-4">
      <title>Auction house</title>
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
        Auction house
      </h1>
      {showAuctionNFT ? (
        <div className="grid grid-cols-1 sm:grid-cols-3 xl:grid-cols-4 gap-5">
          {auctionHouseNFT &&
            auctionHouseNFT.map((nft: any) => (
              <AuctionNFTcard key={nft.uid} nft={nft} />
            ))}
        </div>
      ) : (
        auctionHouseFT &&
        auctionHouseFT.map((set: any) => (
          <div className="text-white mx-4" mx-5 key={set.set}>
            <h1 className="text-2xl font-semibold my-5">{set.set}</h1>
            <div className="grid grid-cols-1 sm:grid-cols-3 xl:grid-cols-4 gap-5">
              {set.auctions.map((auction: any) => (
                <AuctionFTcard
                  key={`${auction.uid}-${auction.time}`}
                  ft={auction}
                />
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Tools;
