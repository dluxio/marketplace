import axios from "axios";
import { useTranslation } from "next-export-i18n";
import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { apiLinkState, dayVolumeState } from "../../atoms";

export const DLUXInfocard = ({ coin }: { coin: string }) => {
  const [bidPrice, setBidPrice] = useState({ dollars: 0, dlux: 0 });
  const [askPrice, setAskPrice] = useState({ dollars: 0, dlux: 0 });
  const [lastPrice, setLastPrice] = useState({ dollars: 0, dlux: 0 });
  const [volumePrice, setVolumePrice] = useRecoilState(dayVolumeState);
  const [dexData, setDexData] = useState<{ markets: any }>();
  const { t } = useTranslation();

  const apiLink: string = useRecoilValue(apiLinkState);

  useEffect(() => {
    let hiveCost = 0;
    let hbdCost = 0;

    const fetchCoins = async () => {
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
      hiveCost = hiveData.market_data.current_price.usd;
      hbdCost = hbdData.market_data.current_price.usd;
    };

    fetchCoins();
    if (coin) {
      axios.get(`${apiLink}dex`).then(({ data }) => {
        setDexData(data);
        if (coin === "HIVE") {
          if (data.markets.hive.sells.length && data.markets.hive.buys.length) {
            setBidPrice({
              dlux: parseFloat(data.markets.hive.buys[0].rate),
              dollars: parseFloat(
                (
                  parseFloat(data.markets.hive.tick) *
                  hiveCost *
                  data.markets.hive.buys[0].rate
                ).toFixed(2)
              ),
            });
            setAskPrice({
              dlux: parseFloat(data.markets.hive.sells[0].rate),
              dollars: parseFloat(
                (
                  parseFloat(data.markets.hive.tick) *
                  hiveCost *
                  data.markets.hive.sells[0].rate
                ).toFixed(2)
              ),
            });
          } else {
            setBidPrice({
              dlux: 0,
              dollars: 0,
            });
            setAskPrice({
              dlux: 0,
              dollars: 0,
            });
          }

          setLastPrice({
            dlux: data.markets.hive.tick,
            dollars: parseFloat(
              (parseFloat(data.markets.hive.tick) * hiveCost).toFixed(2)
            ),
          });
        } else if (coin === "HBD") {
          if (data.markets.hbd.sells.length && data.markets.hbd.buys.length) {
            setBidPrice({
              dlux: data.markets.hbd.sells[0].rate,
              dollars: parseFloat(
                (
                  parseFloat(data.markets.hbd.tick) *
                  hbdCost *
                  data.markets.hbd.sells[0].rate
                ).toFixed(2)
              ),
            });
            setAskPrice({
              dlux: data.markets.hbd.buys[0].rate,
              dollars: parseFloat(
                (
                  parseFloat(data.markets.hbd.tick) *
                  hbdCost *
                  data.markets.hbd.sells[0].rate
                ).toFixed(2)
              ),
            });
          } else {
            setBidPrice({
              dlux: 0,
              dollars: 0,
            });
            setAskPrice({
              dlux: 0,
              dollars: 0,
            });
          }

          setLastPrice({
            dlux: data.markets.hbd.tick,
            dollars: parseFloat(
              (parseFloat(data.markets.hbd.tick) * hiveCost).toFixed(2)
            ),
          });
        }
      });
    }
  }, [coin]);

  useEffect(() => {
    if (dexData) {
      if (coin === "HIVE") {
        setVolumePrice({
          dlux: volumePrice.dlux,
          dollars: (
            parseFloat(volumePrice.dlux) * dexData.markets.hive.tick
          ).toFixed(2),
        });
      } else {
        setVolumePrice({
          dlux: volumePrice.dlux,
          dollars: (
            parseFloat(volumePrice.dlux) * dexData.markets.hbd.tick
          ).toFixed(2),
        });
      }
    }
  }, [coin]);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-white text-xl">
      <div className="mx-3 flex flex-col justify-center items-center gap-3">
        <h1 className="px-5 py-2 bg-gray-500 rounded-xl">{t("bid")}</h1>
        <div className="flex flex-col justify-center items-center text-md">
          <h1>{bidPrice.dlux}</h1>
          <h1>${bidPrice.dollars}</h1>
        </div>
      </div>
      <div className="mx-3 flex flex-col justify-center items-center gap-3">
        <h1 className="px-5 py-2 bg-gray-500 rounded-xl">{t("ask")}</h1>
        <div className="flex flex-col justify-center items-center text-md">
          <h1>{askPrice.dlux}</h1>
          <h1>${askPrice.dollars}</h1>
        </div>
      </div>
      <div className="mx-3 flex flex-col justify-center items-center gap-3">
        <h1 className="px-5 py-2 bg-gray-500 rounded-xl">{t("last")}</h1>
        <div className="flex flex-col justify-center items-center text-md">
          <h1>{lastPrice.dlux}</h1>
          <h1>${lastPrice.dollars}</h1>
        </div>
      </div>
      <div className="mx-3 flex flex-col justify-center items-center gap-3">
        <h1 className="px-5 py-2 bg-gray-500 rounded-xl">{t("hourVolume")}</h1>
        <div className="flex flex-col justify-center items-center text-md">
          <h1>{volumePrice.dlux}</h1>
          <h1>${volumePrice.dollars}</h1>
        </div>
      </div>
    </div>
  );
};
