import React, { MouseEventHandler } from 'react';
import { ImCross } from 'react-icons/im';

type SellFormProps = {
  handleClose: MouseEventHandler;
};

export const SellForm = ({ handleClose }: SellFormProps) => {
  return (
    <div className="fixed top-0 left-0 flex justify-center items-center h-full w-full bg-gray-700 bg-opacity-50 z-50">
      <button className="m-5 absolute top-0 left-0">
        <ImCross size={25} color="#fff" opacity={100} onClick={handleClose} />
      </button>
    </div>
  );
};
