import React, { MouseEventHandler } from "react";
import { ImCross } from "react-icons/im";
import { useRecoilState, useRecoilValue } from "recoil";
import { broadcastState, userState } from "../../atoms";
import { claim } from "../../utils";
import { ModalWrapper } from "../Utils/ModalWrapper";

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
    <ModalWrapper handleClose={handleClose}>
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
    </ModalWrapper>
  );
};
