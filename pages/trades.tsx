import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { apiLinkState, refreshState, userState } from "../atoms";

import axios from "axios";
import { NFTTradeCard as RespondCard } from "../components/Card/ResponseCard";
import { NFTManage as ManageCard } from "../components/Card/ManageCard";
import { useTranslation } from "next-export-i18n";

const Trades = () => {
  const [nft, setNFT] = useState(true);
  const [NFTtradesToRespond, setNFTTradesToRespond] = useState<[]>();
  const [FTtradesToRespond, setFTTradesToRespond] = useState<[]>();
  const [NFTtradesToManage, setNFTTradesToManage] = useState<[]>();
  const [FTtradesToManage, setFTTradesToManage] = useState<[]>();
  const [respond, setRespond] = useState(true);
  const { t } = useTranslation();
  const user: any = useRecoilValue(userState);
  const refresh: string = useRecoilValue(refreshState);
  const apiLink: string = useRecoilValue(apiLinkState);

  useEffect(() => {
    user &&
      axios.get(`${apiLink}api/trades/nfts/${user.name}`).then(({ data }) => {
        setNFTTradesToRespond(
          data.result.filter((trade: any) => trade.from !== user.name)
        );
        setNFTTradesToManage(
          data.result.filter((trade: any) => trade.from === user.name)
        );
      });
    user &&
      axios
        .get(`${apiLink}api/trades/fts/${user.name}`)
        .then(({ data: { result } }) => {
          setFTTradesToRespond(
            result.filter((trade: any) => trade.from !== user.name)
          );
          setFTTradesToManage(
            result.filter((trade: any) => trade.from === user.name)
          );
        });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, refresh]);

  return (
    <div className="mx-10 my-4 text-white font-medium">
      <title>{t("trades")}</title>
      <div className="flex gap-4 justify-center">
        <div className="flex justify-center">
          <button
            onClick={() => setRespond(true)}
            className={`p-2 ${
              respond && "bg-gray-800"
            } rounded-l-full bg-gray-700 text-white transition-all`}
          >
            {t("respond")}
          </button>
          <button
            onClick={() => setRespond(false)}
            className={`p-2 ${
              !respond && "bg-gray-800"
            } rounded-r-full bg-gray-700 text-white transition-all`}
          >
            {t("manage")}
          </button>
        </div>
        <div className="flex justify-center">
          <button
            onClick={() => setNFT(true)}
            className={`p-2 ${
              nft && "bg-gray-800"
            } rounded-l-full bg-gray-700 text-white transition-all`}
          >
            NFTs
          </button>
          <button
            onClick={() => setNFT(false)}
            className={`p-2 ${
              !nft && "bg-gray-800"
            } rounded-r-full bg-gray-700 text-white transition-all`}
          >
            FTs
          </button>
        </div>
      </div>
      <h1 className="text-3xl">{t("trades")}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-4 xl:grid-cols-5 gap-8 my-5">
        {nft
          ? respond
            ? NFTtradesToRespond &&
              NFTtradesToRespond.map((trade: any) => (
                <RespondCard key={trade.item} trade={trade} />
              ))
            : NFTtradesToManage &&
              NFTtradesToManage.map((trade: any) => (
                <ManageCard key={trade.item} trade={trade} />
              ))
          : respond
          ? FTtradesToRespond &&
            FTtradesToRespond.map((trade: any) => (
              <RespondCard key={trade.item} trade={trade} />
            ))
          : FTtradesToManage &&
            FTtradesToManage.map((trade: any) => (
              <ManageCard key={trade.item} trade={trade} />
            ))}
      </div>
    </div>
  );
};

export default Trades;
