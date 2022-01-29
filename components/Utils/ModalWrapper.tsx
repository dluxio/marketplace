import React, { MouseEventHandler } from "react";
import { ImCross } from "react-icons/im";

interface IModal {
  handleClose: any;
}

export const ModalWrapper: React.FC<IModal> = ({ children, handleClose }) => {
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
        {children}
      </div>
    </div>
  );
};
