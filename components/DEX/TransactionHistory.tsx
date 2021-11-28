import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { apiLinkState } from "../../atoms";

export const TransactionHistory = ({ coin }: { coin: "HIVE" | "HBD" }) => {
  const [tickerID, setTickerID] = useState("HIVE_DLUX");
  const apiLink: string = useRecoilValue(apiLinkState);

  useEffect(() => {
    axios.get(`${apiLink}api/pairs`).then(({ data }) => {
      console.log(data);
      coin === "HIVE"
        ? setTickerID(data[0].ticker_id)
        : setTickerID(data[1].ticker_id);
    });
  }, []);

  useEffect(() => {
    if (tickerID) {
      axios
        .get(`${apiLink}api/historical_trades/${tickerID}`)
        .then(({ data }) => {
          console.log(data);
        });
    }
  }, [tickerID]);

  return (
    <div className="flex flex-col text-white">
      <h1 className="text-xl">Trade history</h1>
    </div>
  );
};
