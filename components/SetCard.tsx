import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { AuctionDetail } from "./Detail";
import { useTranslation } from "next-export-i18n";

export const SetCard = ({ nft }: { nft: any }) => {
  const router = useRouter();
  const [colors, setColors] = useState<string[]>([]);
  const [showInfo, setShowInfo] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    axios
      .get(`https://ipfs.io/ipfs/${nft.script}?${nft.uid}`)
      .then(({ data }) => {
        const code = `(//${data}\n)("${nft.uid}")`;
        const SVG = eval(code);
        console.log(SVG);
        const elem = document.getElementById(`image-${nft.set}-${nft.uid}`);
        setColors([SVG.set.Color1, SVG.set.Color2]);
        if (elem) {
          elem!.innerHTML = SVG.HTML;
        }
      });
  }, []);

  return (
    <>
      <div className="border shadow-xl h-auto border-transparent bg-gray-700 rounded-xl  text-white flex flex-col">
        <h1
          className="text-center w-full rounded-t-xl font-black py-2 text-xl"
          style={{
            background: `linear-gradient(to bottom,  ${colors[0]} 0%,${colors[1]} 100%)`,
          }}
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
          <div
            style={{
              background: `linear-gradient(to bottom,  ${colors[0]} 0%,${colors[1]} 100%)`,
            }}
            className="px-3 py-2 rounded-xl flex items-center gap-3"
          >
            <h1>{t("owner")}:</h1>
            <h1
              className="hover:text-gray-300 cursor-pointer font-bold"
              onClick={() => router.push(`/@${nft.owner}`)}
            >
              {nft.owner}
            </h1>
          </div>
        </div>
      </div>
      {showInfo && (
        <AuctionDetail onExit={() => setShowInfo(false)} nft={nft} />
      )}
    </>
  );
};
