import React, { useState, useEffect } from 'react';

import hive from '@hiveio/hive-js';

type NftDetailProps = {
  nft: any;
};

interface details {
  title: string;
  url: string;
}

export const NftDetails = ({ nft }: NftDetailProps) => {
  const [nftDetails, setNFTdetails] = useState<details>();

  const fetchDetails = () => {
    fetch(`https://token.dlux.io/api/nft/${nft.uid}`)
      .then((response) => response.json())
      .then((data) => {
        const author = data.set.author;
        const link = data.set.link;

        hive.api.getContent(author, link, (err: any, result: any) => {
          if (err) throw new Error(err);
          setNFTdetails(result);
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
          SVG;
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
    <div className="w-full text-center">
      <div id={`${nft.set}-${nft.uid}-details`} className="w-1/2 mx-auto"></div>
      <h1 className="text-white text-2xl font-bold mt-5">{nft.uid}</h1>
      <h2 className="text-white text-xl font-semibold">{nftDetails?.title}</h2>
      <p className="text-white text-md font-semibold mt-5">
        For more info, visit:
        <br />
        <a
          target="_blank"
          rel="noreferrer"
          href={'https://peakd.com' + nftDetails?.url}
          className="text-gray-400 text-md font-semibold hover:text-gray-700"
        >
          {nftDetails?.url}
        </a>
      </p>
      <div className="m-5 flex flex-col justify-center gap-5 sm:mx-48">
        <button className="px-4 py-2 rounded-lg border-2 text-green-500 bg-transparent border-green-500 focus:outline-none focus:ring-2 focus:ring-green-700">
          Open
        </button>
        <button className="px-4 py-2 rounded-lg border-2 text-blue-500 bg-transparent border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-700">
          Sell
        </button>
        <button className="px-4 py-2 rounded-lg border-2 text-red-500 bg-transparent border-red-500 focus:outline-none focus:ring-2 focus:ring-red-700">
          Transfer
        </button>
      </div>
    </div>
  );
};
