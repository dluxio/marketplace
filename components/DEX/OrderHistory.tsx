import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { apiLinkState } from "../../atoms";

export const OrderHistory = ({
  type,
  coin,
}: {
  coin: "HIVE" | "HBD";
  type: "buy" | "sell";
}) => {
  const [orders, setOrders] = useState<any>([]);
  const [totalSum, setTotalSum] = useState(0);
  const apiLink: string = useRecoilValue(apiLinkState);

  useEffect(() => {
    let total = 0;
    orders.forEach(
      (order: any) =>
        (total += parseFloat(
          parseFloat(
            (
              +order.hivenai.amount / Math.pow(10, order.hivenai.precision)
            ).toString()
          ).toFixed(order.hivenai.precision)
        ))
    );
    setTotalSum(total);

    axios.get(`${apiLink}dex`).then(({ data: { markets } }) => {
      if (coin === "HIVE" && type === "buy") {
        setOrders(markets.hive.buys);
      } else if (coin === "HBD" && type === "buy") {
        setOrders(markets.hbd.buys);
      } else if (coin === "HIVE" && type === "sell") {
        setOrders(markets.hive.sells);
      } else if (coin === "HBD" && type === "sell") {
        setOrders(markets.hbd.sell);
      }
    });
  }, []);

  useEffect(() => console.log(orders), [orders]);

  return (
    <div className="flex flex-col gap-2 text-white text-xl">
      <div className="flex gap-3">
        <h1 className={type === "sell" ? "text-red-500" : "text-green-500"}>
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </h1>
        <h1>orders</h1>
      </div>
      <div className="flex gap-10 font-light"></div>
      {orders && orders.length !== 0 ? (
        orders.map((order: any, i: number) => {
          const orderCoin = order.type.split(":")[0];
          return (
            <div className="flex gap-10 font-normal">
              <div className="flex items-center flex-col gap-2">
                {i === 0 && (
                  <h1 className="font-light">
                    TOTAL {orderCoin.toUpperCase()}
                  </h1>
                )}
                <h1>{totalSum}</h1>
              </div>
              <div className="flex items-center flex-col gap-2">
                {i === 0 && (
                  <h1 className="font-light">{orderCoin.toUpperCase()}</h1>
                )}
                {orderCoin === "hive" ? (
                  <h1>
                    {parseFloat(
                      (
                        +order.hivenai.amount /
                        Math.pow(10, order.hivenai.precision)
                      ).toString()
                    ).toFixed(order.hivenai.precision)}
                  </h1>
                ) : (
                  <h1>
                    {parseFloat(
                      (
                        +order.hbdnai.amount /
                        Math.pow(10, order.hbdnai.precision)
                      ).toString()
                    ).toFixed(order.hbdnai.precision)}
                  </h1>
                )}
              </div>
              <div className="flex items-center flex-col gap-2">
                {i === 0 && <h1 className="font-light">DLUX</h1>}
                <h1>
                  {parseFloat(
                    (
                      +order.amountnai.amount /
                      Math.pow(10, order.amountnai.precision)
                    ).toString()
                  ).toFixed(order.amountnai.precision)}
                </h1>
              </div>
              <div className="flex items-center flex-col gap-2">
                {i === 0 && <h1 className="font-light">BID</h1>}
                <h1>{order.rate}</h1>
              </div>
            </div>
          );
        })
      ) : (
        <div className="flex gap-10 font-light">
          <h1>TOTAL {coin}</h1>
          <h1>{coin}</h1>
          <h1>DLUX</h1>
          <h1>ASK</h1>
        </div>
      )}
    </div>
  );
};
