import React, { useEffect, useState } from "react";

export const TransactionHistoryItem = ({
  transaction,
  i,
  transactions,
}: {
  transaction: any;
  i: number;
  transactions: any[];
}) => {
  const [totalSum, setTotalSum] = useState("");

  useEffect(() => {
    let total = 0;
    transactions.forEach((transaction, index) => {
      if (index <= i) {
        total += +transaction.price;
      }
    });

    setTotalSum(total.toFixed(3));
  }, []);

  return (
    <div
      className={`${
        i % 2 === 0 ? "bg-gray-500" : ""
      } text-xl px-2 py-1 grid grid-cols-5`}
    >
      <h1 className="w-2/3">
        {new Date(transaction.trade_timestamp).toUTCString()}
      </h1>
      <h1
        className={
          transaction.type === "buy" ? "text-green-500" : "text-red-500"
        }
      >
        {transaction.type.toUpperCase()}
      </h1>
      <h1>{transaction.base_volume}</h1>
      <h1>{transaction.price}</h1>
      <h1>{totalSum}</h1>
    </div>
  );
};
