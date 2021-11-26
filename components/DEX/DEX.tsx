import React from "react";
import { Order } from "./Order";
import { DLUXInfocard } from "./DLUXInfocard";

export const DEX = () => {
  return (
    <div className="flex w-full justify-center">
      <div className="flex justify-center items-center gap-9">
        <div className="flex flex-col bg-gray-600 border-2 rounded-xl border-gray-800 p-5">
          <DLUXInfocard />
          <div className="flex justify-between">
            <Order type="buy" />
            <Order type="sell" />
          </div>
        </div>
      </div>
    </div>
  );
};
