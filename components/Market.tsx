import React, { useEffect, useState } from "react";

import axios from "axios";

import { AuctionNFTcard, MarketNav, NftCard } from ".";
import { CoinCard } from ".";

import Link from "next/link";

import { useRecoilState, useRecoilValue } from "recoil";
import {
  marketNavState,
  coinState,
  prefixState,
  apiLinkState,
  dlux_ccState,
} from "../atoms";
import { NewsScreen } from "./NewsScreen";
import { AppScreen } from "./AppScreen";
import { useTranslation } from "next-export-i18n";

export const Market = () => {
  const [nfts, setNfts] = useState([]);
  const [auction, setAuction] = useState([]);
  const [_prefix, setPrefix] = useRecoilState(prefixState);
  const [_cc, setCC] = useRecoilState(dlux_ccState);
  const { t } = useTranslation();

  const selectedMarket = useRecoilValue(marketNavState);
  const apiLink: string = useRecoilValue(apiLinkState);
  const [coins, setCoins] = useRecoilState<any>(coinState);

  useEffect(() => {
    const fetchNfts = async () => {
      axios.get(`${apiLink}api/sales`).then(({ data: { result } }) => {
        setNfts(result);
      });
    };

    const fetchAuction = () => {
      axios.get(`${apiLink}api/auctions`).then(({ data: { result } }) => {
        setAuction(result);
      });
    };

    const fetchCoins = async () => {
      const dluxData = {
        name: "DLUX",
        image: {
          large: "https://www.dlux.io/img/dlux-hive-logo-alpha.svg",
        },
        market_data: {
          current_price: {
            usd: 0,
          },
        },
      };

      const { data: hiveData } = await axios.get(
        "https://api.coingecko.com/api/v3/coins/hive",
        {
          headers: {
            accept: "application/json",
          },
        }
      );
      const { data: hbdData } = await axios.get(
        "https://api.coingecko.com/api/v3/coins/hive_dollar",
        {
          headers: {
            accept: "application/json",
          },
        }
      );

      axios.get(`${apiLink}dex`).then(({ data }) => {
        dluxData.market_data.current_price.usd =
          data.markets.hive.tick * hiveData.market_data.current_price.usd;

        setCoins([hiveData, dluxData, hbdData]);
      });
    };

    const fetchPrefix = () => {
      axios.get(`${apiLink}api/protocol`).then(({ data }) => {
        setPrefix(data.prefix);
        setCC(data.multisig);
      });
    };

    if (!coins.length) {
      fetchCoins();
    }
    fetchPrefix();
    fetchNfts();
    fetchAuction();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="w-full h-full">
      <MarketNav />
      {selectedMarket === "exchange" && (
        <>
          <h1 className="text-3xl mx-10 my-4 text-white font-medium">
            {t("tokens").toUpperCase()}
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mx-10">
            {coins &&
              coins.map((coin: any) => <CoinCard key={coin.id} coin={coin} />)}
          </div>
          {nfts.length !== 0 && (
            <Link href="/listings" passHref={true}>
              <h1 className="cursor-pointer text-3xl ml-10 mb-4 w-1/5 mt-10 text-white font-medium">
                {t("listings").toUpperCase()}
              </h1>
            </Link>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 mx-10 my-3">
            {nfts &&
              nfts.map(
                (nft: any, i) =>
                  i <= 3 && <NftCard key={`${nft.set}_${nft.uid}`} nft={nft} />
              )}
          </div>
          {auction.length !== 0 && (
            <Link href="/auction" passHref={true}>
              <h1 className="cursor-pointer text-3xl mx-10 my-4 text-white font-medium">
                {t("auctionHouse").toUpperCase()}
              </h1>
            </Link>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 mx-10 my-3">
            {auction &&
              auction.map(
                (nft: any, i) =>
                  i <= 3 && (
                    <AuctionNFTcard key={`${nft.set}_${nft.uid}`} nft={nft} />
                  )
              )}
          </div>
        </>
      )}
      {selectedMarket === "apps" && <AppScreen />}
      {selectedMarket === "news" && <NewsScreen />}
    </div>
  );
};
