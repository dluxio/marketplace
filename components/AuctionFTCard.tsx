import React, { useEffect, useState } from 'react';
import { setColors } from '../constants';

import Countdown from 'react-countdown';

import axios from 'axios';

import { GiTakeMyMoney } from 'react-icons/gi';
import { BidForm } from './Forms/BidForm';

import { useRecoilValue } from 'recoil';
import { userState } from '../atoms';
import { toBase64 } from '../utils';
import { FaQuestion } from 'react-icons/fa';

type AuctionCardProps = {
  ft: any;
};

export const AuctionFTcard = ({ ft }: AuctionCardProps) => {
  const id = '_' + Math.random().toString(36).substr(2, 9);
  const user: any = useRecoilValue(userState);
  const [isBidding, setIsBidding] = useState(false);
  const [randomUID, setRandomUID] = useState('==');

  const randomUIDGen = (setData: any) => {
    const num = Math.round(Math.random() * (setData.max - (setData.min || 0)));
    const UID = toBase64(num);
    setRandomUID(UID);
  };

  useEffect(() => {
    axios.get(`https://token.dlux.io/api/set/${ft.set}`).then(({ data }) => {
      setInterval(() => {
        randomUIDGen(data.set);
      }, 1000);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    axios
      .get(`https://ipfs.io/ipfs/${ft.script}?${randomUID}`)
      .then(({ data }) => {
        const code = `(//${data}\n)("${randomUID}")`;
        const SVG = eval(code);

        document.getElementById(`image-${ft.set}-${id}-auction`)!.innerHTML =
          SVG.HTML;
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [randomUID]);

  return (
    <>
      <div className="border shadow-xl h-auto border-transparent bg-gray-700 rounded-xl  text-white flex flex-col">
        <h1
          className="text-center w-full rounded-t-xl font-black py-2 text-xl"
          style={{ backgroundColor: setColors[ft.set] }}
        >
          <Countdown date={Date.parse(ft.time)} />
        </h1>
        <div className="py-5 text-center">
          <div className="relative">
            <div className="bg-gray-700 absolute top-0 w-full h-full bg-opacity-70 flex justify-center items-center">
              <FaQuestion size={60} color="#fff" />
            </div>
            <div
              id={`image-${ft.set}-${id}-auction`}
              className="w-1/2 mx-auto"
            ></div>
          </div>
        </div>
        <div className="px-2 sm:px-4 py-4 w-full flex justify-between items-center gap-3">
          <div>
            <h1>
              Price:{' '}
              <strong>
                {parseFloat(
                  (
                    ft.price.amount / Math.pow(10, ft.price.precision)
                  ).toString()
                ).toFixed(ft.price.precision)}{' '}
              </strong>
            </h1>
            <h1>
              Bids: <strong>{ft.bids}</strong>
            </h1>
          </div>
          <button
            disabled={!user ? true : false}
            onClick={() => user && setIsBidding(true)}
            className={`px-6 py-2 rounded-xl flex items-center gap-2 ${
              !user && 'cursor-not-allowed'
            }`}
            style={{ backgroundColor: user ? setColors[ft.set] : 'gray' }}
          >
            Bid
            <GiTakeMyMoney />
          </button>
        </div>
      </div>
      {isBidding && (
        <BidForm
          set={ft.set}
          uid={ft.uid}
          handleClose={() => setIsBidding(false)}
        />
      )}
    </>
  );
};
