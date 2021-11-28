import React from "react";

export const OrderHistoryElement = ({
  order,
  i,
}: {
  order: any;
  i: number;
}) => {
  const orderCoin = order.type.split(":")[0];

  return (
    <div
      className={`${
        i % 2 === 0 ? "bg-gray-500" : ""
      } grid grid-cols-4 gap-5 my-1 px-2 py-1`}
    >
      <h1>{}</h1>
      <h1>
        {orderCoin === "hive"
          ? parseFloat(
              (
                +order.hivenai.amount / Math.pow(10, order.hivenai.precision)
              ).toString()
            ).toFixed(order.hivenai.precision)
          : parseFloat(
              (
                +order.hbdnai.amount / Math.pow(10, order.hbdnai.precision)
              ).toString()
            ).toFixed(order.hbdnai.precision)}
      </h1>
      <h1>
        {parseFloat(
          (
            +order.amountnai.amount / Math.pow(10, order.amountnai.precision)
          ).toString()
        ).toFixed(order.amountnai.precision)}
      </h1>
      <h1>{order.rate}</h1>
    </div>
  );
};
