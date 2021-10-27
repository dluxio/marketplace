import React, { useEffect, useState } from 'react';

import axios from 'axios';
import { NFTBuy, toBase64 } from '../utils';
import { setColors } from '../constants';
import { FaMoneyBillAlt, FaQuestion } from 'react-icons/fa';
import { useRecoilState, useRecoilValue } from 'recoil';
import { broadcastState, userState } from '../atoms';

type FTCardProps = {
  ft: {
    set: string;
    script: string;
    pricenai: { precision: number; amount: number };
  };
};

export const FTCard = ({ ft }: FTCardProps) => {
  const { set, script } = ft;
  const [randomUID, setRandomUID] = useState('==');
  const [_braodcasts, setBroadcasts] = useRecoilState<any>(broadcastState);
  const user: any = useRecoilValue(userState);

  const id = '_' + Math.random().toString(36).substr(2, 9);

  const randomUIDGen = (setData: any) => {
    const num = Math.round(Math.random() * (setData.max - (setData.min || 0)));
    const UID = toBase64(num);
    setRandomUID(UID);
  };

  useEffect(() => {
    axios.get(`https://token.dlux.io/api/set/${set}`).then(({ data }) => {
      setInterval(() => {
        randomUIDGen(data.set);
      }, 1000);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleBuy = async () => {
    const response: any = await NFTBuy(user.name, {
      set,
    });
    if (response) {
      if (response.success) {
        setBroadcasts((prevState: any) => [...prevState, response]);
      }
    }
  };

  useEffect(() => {
    axios
      .get(`https://ipfs.io/ipfs/${script}?${randomUID}`)
      .then(({ data }) => {
        const code = `(//${data}\n)("${randomUID}")`;
        const SVG = eval(code);

        if (document.getElementById(`image-${set}-${id}`)) {
          document.getElementById(`image-${set}-${id}`)!.innerHTML = SVG.HTML;
        }
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [randomUID]);

  return (
    <div className="border shadow-xl h-auto border-transparent bg-gray-700 rounded-xl  text-white flex flex-col">
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
      <div className="px-5 py-4 w-full flex justify-between items-center">
        <h1>
          Price:{' '}
          <strong>
            {parseFloat(
              (
                +ft.pricenai.amount / Math.pow(10, ft.pricenai.precision)
              ).toString()
            ).toFixed(ft.pricenai.precision)}
          </strong>
        </h1>
        <button
          onClick={() => user && handleBuy()}
          className={`px-6 py-2 rounded-xl flex items-center gap-2 ${
            !user && 'cursor-not-allowed'
          }`}
          style={{ backgroundColor: user ? setColors[set] : 'gray' }}
        >
          Buy
          <FaMoneyBillAlt />
        </button>
      </div>
    </div>
  );
};
