import React, { useEffect, useState } from "react";

import Countdown from "react-countdown";

import axios from "axios";

import { GiTakeMyMoney } from "react-icons/gi";
import { AuctionDetail } from "./Detail";
import { BidForm } from "./Forms/BidForm";

import { useRecoilValue } from "recoil";
import { userState } from "../atoms";
import { useRouter } from "next/router";

type AuctionCardProps = {
  nft: any;
};

export const AuctionNFTcard = ({ nft }: AuctionCardProps) => {
  const [colors, setColors] = useState<any>([]);
  const user: any = useRecoilValue(userState);
  const router = useRouter();
  const [isBidding, setIsBidding] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  useEffect(() => {
    axios
      .get(`https://ipfs.io/ipfs/${nft.script}?${nft.uid}`)
      .then(({ data }) => {
        const code = `(//${data}\n)("${nft.uid}")`;
        const SVG = eval(code);
        document.getElementById(
          `image-${nft.set}-${nft.uid}-auction`
        )!.innerHTML = SVG.HTML;
      });
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

  return (
    <>
      <div className="border shadow-xl h-auto border-transparent bg-gray-700 rounded-xl  text-white flex flex-col">
        <h1
          className="text-center w-full rounded-t-xl font-black py-2 text-xl"
          style={{
            background: `linear-gradient(${colors[0]} 30%, ${colors[1]})`,
          }}
        >
          <Countdown date={Date.parse(nft.time)} />
        </h1>
        <div
          onClick={() => setShowInfo(true)}
          className="py-5 text-center cursor-pointer"
        >
          <div
            id={`image-${nft.set}-${nft.uid}-auction`}
            className="w-1/2 flex justify-center mx-auto"
          ></div>
          <h1 className="pt-2 text-xl">{nft.uid}</h1>
        </div>
        <div className="px-2 sm:px-4 py-4 w-full flex text-center flex-col justify-between items-center gap-3">
          <div>
            {nft.bidder && (
              <h1
                className="hover:text-gray-300 cursor-pointer"
                onClick={() => router.push(`/@${nft.bidder}`)}
              >
                Bidder: <strong>{nft.bidder}</strong>
              </h1>
            )}
            <h1>
              Price:{" "}
              <strong>
                {parseFloat(
                  (
                    nft.price.amount / Math.pow(10, nft.price.precision)
                  ).toString()
                ).toFixed(nft.price.precision)}{" "}
              </strong>
            </h1>
            <h1>
              Bids: <strong>{nft.bids}</strong>
            </h1>
          </div>
          <button
            disabled={!user ? true : false}
            onClick={() => user && setIsBidding(true)}
            className={`px-6 py-2 rounded-xl flex items-center gap-2 ${
              !user && "cursor-not-allowed"
            }`}
            style={{
              background: `linear-gradient(to bottom,  ${colors[0]} 0%,${colors[1]} 100%)`,
            }}
          >
            Bid
            <GiTakeMyMoney />
          </button>
        </div>
      </div>
      {showInfo && (
        <AuctionDetail onExit={() => setShowInfo(false)} nft={nft} />
      )}
      {isBidding && (
        <BidForm
          set={nft.set}
          kind="nft"
          uid={nft.uid}
          handleClose={() => setIsBidding(false)}
        />
      )}
    </>
  );
};
