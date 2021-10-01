import React, { useEffect, useState } from 'react';
import { setColors } from '../constants';

import { ImArrowRight2, ImCross } from 'react-icons/im';
import { FaQuestion } from 'react-icons/fa';

import { toBase64 } from '../utils';
import { TransferFormComp } from '.';
import { Airdrop } from './Forms/AirdropForm';
import { AuctionFTForm } from './Forms/AuctionFTForm';
import axios from 'axios';

type TokenCardProps = {
  token?: any;
  set: string;
  script: string;
};

export const TokenCard = ({ set, script, token }: TokenCardProps) => {
  const [auction, setAuction] = useState(false);
  const [airdrop, setAirdrop] = useState(false);
  const [isTransfering, setIsTransfering] = useState(false);
  const id = '_' + Math.random().toString(36).substr(2, 9);
  const [randomUID, setRandomUID] = useState('AA');
  const [isFlipped, setIsFlipped] = useState(false);

  const randomUIDGen = (setData: any) => {
    const num = Math.round(Math.random() * (setData.max - (setData.min || 0)));
    const UID = toBase64(num);
    setRandomUID(UID);
  };

  const handleOpen = () => {};

  useEffect(() => {
    axios.get(`https://token.dlux.io/api/set/${set}`).then(({ data }) => {
      setInterval(() => {
        randomUIDGen(data.set);
      }, 1000);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetch(`https://ipfs.io/ipfs/${script}?${randomUID}`)
      .then((response) => response.text())
      .then((data) => {
        const code = `(//${data}\n)("${randomUID}")`;
        const SVG = eval(code);

        if (document.getElementById(`image-${set}-${id}`)) {
          document.getElementById(`image-${set}-${id}`)!.innerHTML = SVG;
        }
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [randomUID]);

  return (
    <div
      className={`border shadow-xl h-auto border-transparent bg-gray-700 rounded-xl  text-white relative`}
    >
      <h1
        className="text-center w-full rounded-t-xl font-black py-2 text-xl"
        style={{ backgroundColor: setColors[set] }}
      >
        {set}
      </h1>
      <div className="py-5">
        <div className="relative">
          <div className="bg-gray-700 absolute top-0 w-full h-full bg-opacity-70 flex justify-center items-center">
            <FaQuestion size={60} color="#fff" />
          </div>
          <div id={`image-${set}-${id}`} className="w-1/2 mx-auto"></div>
        </div>
      </div>
      <div className="px-2 py-4 w-full flex justify-evenly items-center z-50">
        <p>
          Qty: <strong>{token.items.length}</strong>
        </p>
        <button
          className="px-6 py-2 rounded-xl flex items-center gap-2"
          style={{ backgroundColor: setColors[set] }}
          onClick={() => setIsFlipped(true)}
        >
          <ImArrowRight2 size={20} color="#fff" />
        </button>
      </div>
      {isFlipped && (
        <div className="absolute top-0 left-0 h-full w-full bg-gray-700 bg-opacity-50 rounded-xl flex justify-center items-center translate-y-1/2">
          <div className="grid grid-cols-1 gap-5">
            <button
              onClick={handleOpen}
              className="bg-gray-700 px-2 rounded-lg border-2 text-purple-500 bg-transparent border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-700"
            >
              Open
            </button>
            <button
              onClick={() => setIsTransfering(true)}
              className="bg-gray-700 px-2 rounded-lg border-2 text-green-500 bg-transparent border-green-500 focus:outline-none focus:ring-2 focus:ring-green-700"
            >
              Transfer
            </button>
            <button className="bg-gray-700 px-2 rounded-lg border-2 text-yellow-500 bg-transparent border-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-700">
              List for sale
            </button>
            <button
              onClick={() => setAuction(true)}
              className="bg-gray-700 rounded-lg border-2 text-blue-500 bg-transparent border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-700"
            >
              Auction
            </button>
            <button
              onClick={() => setAirdrop(true)}
              className="bg-gray-700 rounded-lg border-2 text-red-500 bg-transparent border-red-500 focus:outline-none focus:ring-2 focus:ring-red-700"
            >
              Airdrop
            </button>
          </div>
          <button
            className="absolute top-0 left-0 p-3"
            onClick={() => setIsFlipped(false)}
          >
            <ImCross color="#fff" />
          </button>
        </div>
      )}
      {isTransfering && (
        <TransferFormComp
          set={set}
          handleClose={() => setIsTransfering(false)}
        />
      )}
      {airdrop && <Airdrop set={set} handleClose={() => setAirdrop(false)} />}
      {auction && (
        <AuctionFTForm set={set} handleClose={() => setAuction(false)} />
      )}
    </div>
  );
};
