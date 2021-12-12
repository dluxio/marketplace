import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import { dlux_ccState, prefixState, userState } from "../../atoms";
import { dexBuy, dexSell } from "../../utils";

export const Order = ({ type, coin }: { type: string; coin: string }) => {
  const [orderType, setOrderType] = useState("limit");
  const [quantity, setQuantity] = useState(0);
  const [total, setTotal] = useState(0);
  const user: any = useRecoilValue(userState);
  const prefix: string = useRecoilValue(prefixState);
  const cc: string = useRecoilValue(dlux_ccState);

  const handlePlaceOrder = () => {
    if (type === "sell" && orderType === "market") {
      dexSell({ dlux: quantity * 1000, hive: 0 }, user.name, prefix);
    } else if (type === "sell" && orderType === "limit") {
      coin === "HIVE"
        ? dexSell(
            { dlux: quantity * 1000, hive: total * 1000 },
            user.name,
            prefix
          )
        : dexSell(
            { dlux: quantity * 1000, hbd: total * 1000 },
            user.name,
            prefix
          );
    } else if (type === "buy" && orderType === "market") {
      dexBuy(
        {
          coin,
          amount: total * 1000,
          buyData: {
            hours: 720,
          },
        },
        user.name,
        cc
      );
    } else if (type === "buy" && orderType === "limit") {
      dexBuy(
        {
          coin,
          amount: total * 1000,
          buyData: {
            rate: parseFloat((total / quantity).toFixed(6)),
            hours: 720,
          },
        },
        user.name,
        cc
      );
    }
  };

  return (
    <div className="flex flex-col flex-grow bg-gray-700 border-2 border-gray-800 p-3 rounded-md">
      <div className="text-white text-xl flex gap-3">
        <h1 className={type === "sell" ? "text-red-500" : "text-green-500"}>
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </h1>
        <h1>DLUX</h1>
      </div>
      <div className="flex flex-col sm:flex-row items-center  mr-5 justify-between mt-2 text-white font-light">
        <h1>Order Type</h1>
        <div className="flex justify-center">
          <button
            onClick={() => setOrderType("limit")}
            className={`p-2 ${
              orderType === "limit" && "bg-gray-900"
            } rounded-l-full bg-gray-800 text-white transition-all`}
          >
            Limit
          </button>
          <button
            onClick={() => setOrderType("market")}
            className={`p-2 ${
              orderType === "market" && "bg-gray-900"
            } rounded-r-full bg-gray-800 text-white transition-all`}
          >
            Market
          </button>
        </div>
      </div>
      <div className="flex text-white gap-3 flex-col mr-3 mt-5">
        {orderType === "limit" && (
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-col mr-5">
              <h1>Quantity</h1>
              <h1 className="font-light text-sm">DLUX</h1>
            </div>
            <input
              step={0.001}
              className="rounded-xl outline-none px-3 py-1 bg-gray-500 text-white"
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(+e.target.value)}
            />
          </div>
        )}
        {orderType === "market" && type === "sell" && (
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-col mr-5">
              <h1>Quantity</h1>
              <h1 className="font-light text-sm">DLUX</h1>
            </div>
            <input
              step={0.001}
              className="rounded-xl outline-none px-3 py-1 bg-gray-500 text-white"
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(+e.target.value)}
            />
          </div>
        )}
        {orderType === "limit" && type === "sell" && (
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-col mr-5">
              <h1>Total</h1>
              <h1 className="font-light text-sm">{coin}</h1>
            </div>
            <input
              step={0.001}
              className="rounded-xl outline-none px-3 py-1 bg-gray-500 text-white"
              type="number"
              value={total}
              onChange={(e) => setTotal(+e.target.value)}
            />
          </div>
        )}
        {type === "buy" && (
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-col mr-5">
              <h1>Total</h1>
              <h1 className="font-light text-sm">{coin}</h1>
            </div>
            <input
              step={0.001}
              className="rounded-xl outline-none px-3 py-1 bg-gray-500 text-white"
              type="number"
              value={total}
              onChange={(e) => setTotal(+e.target.value)}
            />
          </div>
        )}
      </div>
      <div className="flex justify-end">
        <button
          onClick={handlePlaceOrder}
          className={`${
            type === "sell"
              ? "bg-red-500 focus:ring-red-600"
              : "bg-green-500 focus:ring-green-600"
          } text-white mx-4 mt-5 px-4 py-2 rounded-xl focus:ring-2 `}
        >
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </button>
      </div>
    </div>
  );
};
