import React, { useState, useEffect } from 'react';

import hive from '@hiveio/hive-js';
import { TransferNFTFormComp } from './';
import { AuctionNFTForm } from './Forms/AuctionForm';
import { SellForm } from './Forms/SellForm';
import { Confirmation } from './Confirmation';

import { NFTMelt, SetPFP } from '../utils';
import { broadcastState, prefixState, userState } from '../atoms';
import { useRecoilState, useRecoilValue } from 'recoil';

type NftDetailProps = {
  nft: any;
};

interface details {
  title: string;
  url: string;
}

export const NftDetails = ({ nft }: NftDetailProps) => {
  const [confirm, setConfirm] = useState(false);
  const [selling, setSelling] = useState(false);
  const [isTransfering, setIsTransfering] = useState(false);
  const [auction, setAuction] = useState(false);
  const [nftDetails, setNFTdetails] = useState<details>();
  const [_braodcasts, setBroadcasts] = useRecoilState<any>(broadcastState);

  const user: any = useRecoilValue(userState);
  const prefix: string = useRecoilValue(prefixState);

  const handleMelt = () => {
    setConfirm(false);
    NFTMelt(user.name, { set: nft.set, uid: nft.uid }, prefix).then(
      (response: any) => {
        if (response) {
          if (response.success) {
            setBroadcasts((prevState: any) => [...prevState, response]);
          }
        }
      }
    );
  };

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

  const handleSetPfp = () => {
    SetPFP(user.name, prefix, { set: nft.set, uid: nft.uid }).then(
      (response: any) => {
        if (response) {
          if (response.success) {
            setBroadcasts((prevState: any) => [...prevState, response]);
          }
        }
      }
    );
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
    <div className="w-full text-center bg-gray-600 py-10 rounded-xl border-4 border-gray-700">
      <div id={`${nft.set}-${nft.uid}-details`} className="w-1/3 mx-auto"></div>
      <h1 className="text-white text-xl font-bold mt-5">{nft.uid}</h1>
      <p className="text-white text-md font-semibold mt-5">
        {nftDetails?.title}
        <br />
        For more info, visit:{'    '}
        <a
          target="_blank"
          rel="noreferrer"
          href={'https://peakd.com' + nftDetails?.url}
          className="text-gray-400 text-md font-semibold hover:text-gray-500"
        >
          this link
        </a>
      </p>
      <div className="m-5 flex flex-col sm:flex-row gap-5 justify-center">
        <button
          onClick={handleSetPfp}
          className="px-4 py-2 rounded-lg border-2 text-green-500 bg-transparent border-green-500 focus:outline-none focus:ring-2 focus:ring-green-700"
        >
          PFP
        </button>
        <button
          onClick={() => setIsTransfering(true)}
          className="px-4 py-2 rounded-lg border-2 text-blue-500 bg-transparent border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-700"
        >
          Give
        </button>
        <button
          onClick={() => setAuction(true)}
          className="px-4 py-2 rounded-lg border-2 text-yellow-500 bg-transparent border-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-700"
        >
          Auction
        </button>
        <button
          onClick={() => setSelling(true)}
          className="px-4 py-2 rounded-lg border-2 text-red-500 bg-transparent border-red-500 focus:outline-none focus:ring-2 focus:ring-red-700"
        >
          Sell
        </button>
        <button
          onClick={() => setConfirm(true)}
          className="px-4 py-2 rounded-lg border-2 text-red-600 bg-transparent border-red-600 focus:outline-none focus:ring-2 focus:ring-red-800"
        >
          Melt
        </button>
      </div>
      {isTransfering && (
        <TransferNFTFormComp
          uid={nft.uid}
          handleClose={() => setIsTransfering(false)}
          set={nft.set}
        />
      )}
      {auction && (
        <AuctionNFTForm
          set={nft.set}
          uid={nft.uid}
          handleClose={() => setAuction(false)}
        />
      )}
      {selling && (
        <SellForm
          set={nft.set}
          uid={nft.uid}
          handleClose={() => setSelling(false)}
        />
      )}
      {confirm && (
        <Confirmation
          handleClose={() => setConfirm(false)}
          handleContinue={handleMelt}
        />
      )}
    </div>
  );
};
