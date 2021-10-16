import React, { MouseEventHandler } from 'react';
import { ImCross } from 'react-icons/im';

export const Confirmation = ({
  handleClose,
  handleContinue,
}: {
  handleClose: MouseEventHandler;
  handleContinue: MouseEventHandler;
}) => {
  return (
    <div className="fixed top-0 left-0 flex justify-center items-center h-screen w-screen bg-gray-700 bg-opacity-50 z-50">
      <div className="relative p-5 bg-gray-700 rounded-xl border-4 border-gray-800">
        <button className="m-2 absolute top-0 right-0">
          <ImCross size={15} color="#fff" onClick={handleClose} />
        </button>
        <div className="m-8">
          <h1 className="text-center text-white text-2xl mb-3">
            Are you sure?
          </h1>
          <div className="flex justify-between w-full">
            <button
              onClick={handleContinue}
              className="px-4 py-2 mx-2 rounded-lg border-2 text-white bg-transparent border-white focus:outline-none focus:ring-2 focus:ring-gray-700"
            >
              Continue
            </button>
            <button
              onClick={handleClose}
              className="px-4 py-2 mx-2 rounded-lg border-2 text-gray-500 bg-transparent border-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-700"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
