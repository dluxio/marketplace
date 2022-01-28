import React, { MouseEventHandler } from "react";
import { ImCross } from "react-icons/im";
import { useRecoilState, useRecoilValue } from "recoil";
import { broadcastState, userState } from "../../atoms";
import { claim } from "../../utils";

export const GovForm = ({ handleClose }: { handleClose: any }) => {
  const [_broadcasts, setBroadcasts] = useRecoilState<any>(broadcastState);
  const user = useRecoilValue<any>(userState);

  const handleClaim = async (gov: boolean) => {
    handleClose();
    const response: any = await claim(user.name, gov);
    if (response) {
      if (response.success) {
        setBroadcasts((prevState: any) => [...prevState, response]);
      }
    }
  };

  return (
    <div className="fixed top-0 left-0 flex justify-center items-center h-screen w-screen bg-gray-700 bg-opacity-50 z-50 text-white">
      <div className="p-8 bg-gray-700 rounded-xl border-4 border-gray-800 relative">
        <button className="m-2 absolute top-0 right-0">
          <ImCross
            size={15}
            color="#fff"
            opacity={100}
            onClick={handleClose as MouseEventHandler}
          />
        </button>
        <h1 className="text-xl">Assign part of claim to governance?</h1>
        <div className="flex items-center justify-center gap-2 my-3 w-full">
          <button
            onClick={() => handleClaim(true)}
            className="px-4 py-2 rounded-lg border-2 bg-green-500 border-green-600 focus:ring-2 focus:ring-green-500"
          >
            YES
          </button>
          <button
            onClick={() => handleClaim(false)}
            className="px-4 py-2 rounded-lg border-2 bg-red-500 border-red-600 focus:ring-2 focus:ring-red-500"
          >
            NO
          </button>
        </div>
      </div>
    </div>
  );
};
