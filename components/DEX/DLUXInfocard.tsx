import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { apiLinkState } from "../../atoms";

export const DLUXInfocard = ({ coin }: { coin: string }) => {
  const [bidPrice, setBidPrice] = useState({ dollars: 0, dlux: 0 });
  const [askPrice, setAskPrice] = useState({ dollars: 0, dlux: 0 });
  const [lastPrice, setLastPrice] = useState({ dollars: 0, dlux: 0 });
  const [vwmaPrice, setVwmaPrice] = useState({ dollars: 0, dlux: 0 });
  const [volumenPrice, setVolumenPrice] = useState({ dollars: 0, dlux: 0 });

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
      axios.get(`${apiLink}dex`).then(({ data: { markets } }) => {
        if (coin === "HIVE") {
          if (markets.hive.sells[0]) {
            setBidPrice({
              dlux: markets.hive.buys[0].rate,
              dollars: parseFloat(
                (
                  parseFloat(markets.hive.tick) *
                  hiveCost *
                  markets.hive.buys[0].rate
                ).toFixed(3)
              ),
            });
            setAskPrice({
              dlux: markets.hive.sells[0].rate,
              dollars: parseFloat(
                (
                  parseFloat(markets.hive.tick) *
                  hiveCost *
                  markets.hive.sells[0].rate
                ).toFixed(3)
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
            dlux: markets.hive.tick,
            dollars: parseFloat(
              (parseFloat(markets.hive.tick) * hiveCost).toFixed(3)
            ),
          });
        } else if (coin === "HBD") {
          if (markets.hbd.sells[0]) {
            setBidPrice({
              dlux: markets.hbd.sells[0].rate,
              dollars: parseFloat(
                (
                  parseFloat(markets.hbd.tick) *
                  hbdCost *
                  markets.hbd.sells[0].rate
                ).toFixed(3)
              ),
            });
            setAskPrice({
              dlux: markets.hbd.buys[0].rate,
              dollars: parseFloat(
                (
                  parseFloat(markets.hbd.tick) *
                  hbdCost *
                  markets.hbd.sells[0].rate
                ).toFixed(3)
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
            dlux: markets.hbd.tick,
            dollars: parseFloat(
              (parseFloat(markets.hbd.tick) * hiveCost).toFixed(3)
            ),
          });
        }
      });
    }
  }, [coin]);

  return (
    <div className="flex gap-3 text-white text-xl">
      <div className="mx-3 flex flex-col justify-center items-center gap-3">
        <h1 className="px-5 py-2 bg-gray-500 rounded-xl">Bid</h1>
        <div className="flex flex-col justify-center items-center text-md">
          <h1>{bidPrice.dlux}</h1>
          <h1>${bidPrice.dollars}</h1>
        </div>
      </div>
      <div className="mx-3 flex flex-col justify-center items-center gap-3">
        <h1 className="px-5 py-2 bg-gray-500 rounded-xl">Ask</h1>
        <div className="flex flex-col justify-center items-center text-md">
          <h1>{askPrice.dlux}</h1>
          <h1>${askPrice.dollars}</h1>
        </div>
      </div>
      <div className="mx-3 flex flex-col justify-center items-center gap-3">
        <h1 className="px-5 py-2 bg-gray-500 rounded-xl">Last</h1>
        <div className="flex flex-col justify-center items-center text-md">
          <h1>{lastPrice.dlux}</h1>
          <h1>${lastPrice.dollars}</h1>
        </div>
      </div>
      <div className="mx-3 flex flex-col justify-center items-center gap-3">
        <h1 className="px-5 py-2 bg-gray-500 rounded-xl">VWMA</h1>
        <div className="flex flex-col justify-center items-center text-md">
          <h1>{vwmaPrice.dlux}</h1>
          <h1>${vwmaPrice.dollars}</h1>
        </div>
      </div>
      <div className="mx-3 flex flex-col justify-center items-center gap-3">
        <h1 className="px-5 py-2 bg-gray-500 rounded-xl">24h Volume</h1>
        <div className="flex flex-col justify-center items-center text-md">
          <h1>{volumenPrice.dlux}</h1>
          <h1>${volumenPrice.dollars}</h1>
        </div>
      </div>
    </div>
  );
};
