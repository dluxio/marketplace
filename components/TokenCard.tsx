import React, { useEffect, useState } from 'react';
import { setColors } from '../constants';

import { ImArrowRight2 } from 'react-icons/im';

import { toBase64 } from '../utils/base64';

type TokenCardProps = {
  token?: any;
  set: string;
  script: string;
};

export const TokenCard = ({ token, set, script }: TokenCardProps) => {
  const id = '_' + Math.random().toString(36).substr(2, 9);
  const [randomUID, setRandomUID] = useState('AA');

  const randomUIDGen = (setData: any) => {
    const num = Math.round(Math.random() * (setData.max - (setData.min || 0)));
    const UID = toBase64(num);
    setRandomUID(UID);
  };

  useEffect(() => {
    fetch(`https://token.dlux.io/api/set/${set}`)
      .then((response) => response.json())
      .then((data) =>
        setInterval(() => {
          randomUIDGen(data.set);
        }, 1000)
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetch(`https://ipfs.io/ipfs/${script}?${randomUID}`)
      .then((response) => response.text())
      .then((data) => {
        const code = `(//${data}\n)("${randomUID}")`;
        const SVG = eval(code);
        document.getElementById(`image-${set}-${id}`)!.innerHTML = SVG;
      });
  }, [id, randomUID, script, set]);

  return (
    <div className="border shadow-xl h-auto border-transparent bg-gray-700 rounded-xl  text-white flex flex-col ">
      <h1
        className="text-center w-full rounded-t-xl font-black py-2 text-xl"
        style={{ backgroundColor: setColors[set] }}
      >
        {set}
      </h1>
      <div className="py-5">
        <div
          id={`image-${set}-${id}`}
          className="w-1/2 flex justify-center mx-auto"
        ></div>
      </div>
      <div className="px-2 py-4 w-full flex justify-center">
        <button
          className="px-6 py-2 rounded-xl flex items-center gap-2"
          style={{ backgroundColor: setColors[set] }}
        >
          <ImArrowRight2 size={20} color="#fff" />
        </button>
      </div>
    </div>
  );
};
