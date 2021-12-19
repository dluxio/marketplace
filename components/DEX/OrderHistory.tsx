import axios from "axios";
import { useTranslation } from "next-export-i18n";
import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { apiLinkState } from "../../atoms";
import { OrderHistoryElement } from "./OrderHistoryElement";

export const OrderHistory = ({
  type,
  coin,
}: {
  coin: "HIVE" | "HBD";
  type: "buy" | "sell";
}) => {
  const [orders, setOrders] = useState<any>([]);
  const apiLink: string = useRecoilValue(apiLinkState);
  const { t } = useTranslation();

  useEffect(() => {
    axios.get(`${apiLink}dex`).then(({ data: { markets } }) => {
      if (coin === "HIVE" && type === "buy") {
        setOrders(
          markets.hive.buys.length <= 1
            ? markets.hive.buys.sort((a: any, b: any) =>
                parseFloat(a.rate) < parseFloat(b.rate) ? -1 : 1
              )
            : markets.hive.buys.sort((a: any, b: any) =>
                parseFloat(a.rate) > parseFloat(b.rate) ? -1 : 1
              )
        );
      } else if (coin === "HBD" && type === "buy") {
        setOrders(
          markets.hbd.buys.length <= 1
            ? markets.hbd.buys.sort((a: any, b: any) =>
                parseFloat(a.rate) < parseFloat(b.rate) ? -1 : 1
              )
            : markets.hbd.buys.sort((a: any, b: any) =>
                parseFloat(a.rate) > parseFloat(b.rate) ? -1 : 1
              )
        );
      } else if (coin === "HIVE" && type === "sell") {
        setOrders(
          markets.hive.sells.length <= 1
            ? markets.hive.sells.sort((a: any, b: any) =>
                parseFloat(a.rate) < parseFloat(b.rate) ? -1 : 1
              )
            : markets.hive.sells.sort((a: any, b: any) =>
                parseFloat(a.rate) < parseFloat(b.rate) ? -1 : 1
              )
        );
      } else if (coin === "HBD" && type === "sell") {
        setOrders(
          markets.hbd.sells.length <= 1
            ? markets.hbd.sells.sort((a: any, b: any) =>
                parseFloat(a.rate) < parseFloat(b.rate) ? -1 : 1
              )
            : markets.hbd.sell.sort((a: any, b: any) =>
                parseFloat(a.rate) < parseFloat(b.rate) ? -1 : 1
              )
          // .filter((el: any, i: number, array: any) => {
          //   if (array[i + 1]) {
          //     return el.rate !== array[i + 1].rate ? el : true;
          //   }
          // })
        );
      }
    });
  }, [coin]);

  return (
    <div className="text-white text-xl w-full">
      <div className="flex gap-3">
        <h1 className={type === "sell" ? "text-red-500" : "text-green-500"}>
          {t(type)}
        </h1>
        <h1>{t("orders")}</h1>
      </div>
      <div className="grid grid-cols-4 gap-5 mt-3">
        <h1>{t("total").toUpperCase()}</h1>
        <h1>{coin}</h1>
        <h1>DLUX</h1>
        <h1>{t(type === "sell" ? "ask" : "bid").toUpperCase()}</h1>
      </div>
      <div className="mt-2">
        {orders &&
          orders.map((order: any, i: number) => (
            <OrderHistoryElement i={i} order={order} orders={orders} />
          ))}
      </div>
    </div>
  );
};
