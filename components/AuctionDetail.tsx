import React, { MouseEventHandler, useEffect, useState } from 'react';
import { ImCross } from 'react-icons/im';

import hive from '@hiveio/hive-js';

type AuctionDetailProps = {
  onExit: MouseEventHandler;
  nft: any;
};

export const AuctionDetail = ({ onExit, nft }: AuctionDetailProps) => {
  const [details, setDetails] = useState<any>(null);
  const fetchDetails = () => {
    fetch(`https://token.dlux.io/api/nft/${nft.uid}`)
      .then((response) => response.json())
      .then((data) => {
        const author = data.set.author;
        const link = data.set.link;

        hive.api.getContent(author, link, (err: any, result: any) => {
          if (err) throw new Error(err);
          setDetails(result);
        });
      });
  };

  const fetchImage = () => {
    fetch(`https://ipfs.io/ipfs/${nft.script}?${nft.uid}`)
      .then((response) => response.text())
      .then((data) => {
        const code = `(//${data}\n)("${nft.uid}")`;
        const SVG = eval(code);
        document.getElementById(`${nft.set}-${nft.uid}-details`)!.innerHTML =
          SVG.HTML;
      });
  };

  useEffect(() => {
    hive.api.setOptions({ url: 'https://api.deathwing.me/' });
    hive.config.set('address_prefix', 'STM');
    hive.config.set(
      'chain_id',
      'beeab0de00000000000000000000000000000000000000000000000000000000'
    );
    hive.config.set('alternative_api_endpoints', [
      'https://rpc.ecency.com/',
      'https://hived.emre.sh/',
      'https://rpc.ausbit.dev/',
      'https://api.hive.blog/',
    ]);

    if (nft.set !== undefined && nft.uid !== undefined) {
      fetchDetails();
      fetchImage();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nft]);
  return (
    <div className="fixed top-0 left-0 h-screen w-screen overflow-hidden bg-gray-700 bg-opacity-50 z-0">
      <div className="w-full flex flex-col justify-center items-center h-full">
        <div className="bg-gray-600 relative p-10 rounded-xl text-center border-4 border-gray-700">
          <button className="m-2 absolute top-0 right-0 z-50">
            <ImCross size={15} color="white" onClick={onExit} />
          </button>
          <div
            id={`${nft.set}-${nft.uid}-details`}
            className="w-full mx-auto mb-10"
          ></div>
          <h1 className="text-white text-xl font-bold mt-5">
            {nft.set} : {nft.uid}
          </h1>
          <h2 className="text-white text-md font-semibold">{details?.title}</h2>
          <p className="text-white text-md font-semibold mt-5">
            For more info, visit:{'    '}
            <a
              target="_blank"
              rel="noreferrer"
              href={'https://peakd.com' + details?.url}
              className="text-gray-400 text-md font-semibold hover:text-gray-500"
            >
              this link
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};
