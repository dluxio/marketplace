import React, { useState } from "react";

export const Order = ({ type, coin }: { type: string; coin: string }) => {
  const [orderType, setOrderType] = useState("limit");
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [total, setTotal] = useState(0);

  const handlePlaceOrder = () => {
    console.log({
      orderType,
      whatToDo: type,
      price,
      quantity,
      total,
    });
  };

  return (
    <div className="flex flex-col mx-4 flex-grow my-5">
      <div className="text-white text-xl flex gap-3">
        <h1 className={type === "sell" ? "text-red-500" : "text-green-500"}>
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </h1>
        <h1>DLUX</h1>
      </div>
      <div className="flex items-center  mr-5 justify-between mt-2 text-white font-light">
        <h1>Order Type</h1>
        <div className="flex justify-center">
          <button
            onClick={() => setOrderType("limit")}
            className={`p-2 ${
              orderType === "limit" && "bg-gray-800"
            } rounded-l-full bg-gray-700 text-white transition-all`}
          >
            Limit
          </button>
          <button
            onClick={() => setOrderType("market")}
            className={`p-2 ${
              orderType === "market" && "bg-gray-800"
            } rounded-r-full bg-gray-700 text-white transition-all`}
          >
            Market
          </button>
        </div>
      </div>
      <div className="flex text-white gap-3 flex-col mr-3 mt-5">
        <div className="flex items-center justify-between">
          <div className="flex flex-col mr-5">
            <h1>Price</h1>
            <h1 className="font-light text-sm">{coin}/DLUX</h1>
          </div>
          <input
            className="rounded-xl outline-none px-3 py-1 bg-gray-500 text-white"
            type="number"
            value={price}
            onChange={(e) => setPrice(+e.target.value)}
          />
        </div>
        <div className="flex items-center justify-between">
          <div className="flex flex-col mr-5">
            <h1>Quantity</h1>
            <h1 className="font-light text-sm">DLUX</h1>
          </div>
          <input
            className="rounded-xl outline-none px-3 py-1 bg-gray-500 text-white"
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(+e.target.value)}
          />
        </div>
        <div className="flex items-center justify-between">
          <div className="flex flex-col mr-5">
            <h1>Total</h1>
            <h1 className="font-light text-sm">{coin}</h1>
          </div>
          <input
            className="rounded-xl outline-none px-3 py-1 bg-gray-500 text-white"
            type="number"
            value={total}
            onChange={(e) => setTotal(+e.target.value)}
          />
        </div>
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
