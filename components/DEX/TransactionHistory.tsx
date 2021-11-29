import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { apiLinkState } from "../../atoms";
import { TransactionHistoryItem } from "./TransactionHistoryItem";

export const TransactionHistory = ({ coin }: { coin: "HIVE" | "HBD" }) => {
  const [tickerID, setTickerID] = useState("HIVE_DLUX");
  const [transactions, setTransactions] = useState([]);
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
        .get(`${apiLink}api/historical/${tickerID}?depth=200`)
        .then(({ data }) => {
          const sumOfOrders = data.buy.concat(data.sell);
          setTransactions(
            sumOfOrders.sort((x: any, y: any) => {
              return y.trade_timestamp - x.trade_timestamp;
            })
          );
        });
    }
  }, [tickerID]);

  useEffect(() => {
    console.log(transactions);
  }, [transactions]);

  return (
    <div className="flex flex-col text-white">
      <h1 className="text-xl">Trade history</h1>
      <div className="grid mt-2 mb-1 text-xl grid-cols-5">
        <h1>DATE</h1>
        <h1>TYPE</h1>
        <h1>DLUX</h1>
        <h1>HIVE</h1>
        <h1>TOTAL</h1>
      </div>
      {transactions.map((transaction: any, i: number) => (
        <TransactionHistoryItem
          transaction={transaction}
          transactions={transactions}
          i={i}
        />
      ))}
    </div>
  );
};
