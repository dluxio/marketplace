import React, { MouseEventHandler } from "react";
import { ImCross } from "react-icons/im";
import { useRecoilState, useRecoilValue } from "recoil";
import { broadcastState, prefixState, userState } from "../../atoms";
import { NFTBuy } from "../../utils";

type FTBuyProps = {
  ft: {
    set: string;
    script: string;
    price: { precision: number; amount: number };
    by: string;
    uid: string;
    qty: number;
  };
  handleClose: Function;
};

export const FTBuy = ({ ft, handleClose }: FTBuyProps) => {
  const [_broadcasts, setBroadcasts] = useRecoilState<any>(broadcastState);
  const user: any = useRecoilValue(userState);
  const prefix: string = useRecoilValue(prefixState);

  const handleBuy = async () => {
    const response: any = await NFTBuy(
      user.name,
      {
        set: ft.set,
      },
      prefix
    );
    if (response) {
      if (response.success) {
        setBroadcasts((prevState: any) => [...prevState, response]);
      }
    }
  };

  return (
    <div className="fixed top-0 left-0 flex justify-center items-center h-screen w-screen bg-gray-700 bg-opacity-50 z-50">
      <div className="p-8 bg-gray-700 rounded-xl border-4 border-gray-800 relative">
        <button className="m-2 absolute top-0 right-0">
          <ImCross
            size={15}
            color="#fff"
            opacity={100}
            onClick={handleClose as MouseEventHandler}
          />
        </button>
        <h1>Buy FT</h1>
        <h1>How many FTs do you want to buy?</h1>
      </div>
    </div>
  );
};
