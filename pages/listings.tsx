import React, { useEffect, useState } from "react";

import { useRouter } from "next/router";

import { NftCard } from "../components";
import { FTCard } from "../components/FTCard";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { apiLinkState } from "../atoms";

const Listings = () => {
  const [showNFTs, setShowNFTs] = useState(true);
  const [nfts, setNfts] = useState([]);
  const [fts, setFts] = useState([]);
  const router = useRouter();
  const apiLink = useRecoilValue(apiLinkState);

  if (nfts === []) router.push("/");

  useEffect(() => {
    const fetchListings = async () => {
      axios.get(`${apiLink}api/sales`).then(({ data: { result } }) => {
        setNfts(result);
      });

      axios.get(`${apiLink}api/mintsales`).then(({ data: { result } }) => {
        setFts(result);
      });
    };

    fetchListings();
  }, []);

  return (
    <div className="mx-10 my-4 text-white font-medium">
      <title>Listings</title>
      <div className="flex justify-center">
        <button
          onClick={() => setShowNFTs(true)}
          className={`p-2 ${
            showNFTs && "bg-gray-800"
          } rounded-l-full bg-gray-700 text-white transition-all`}
        >
          NFTs
        </button>
        <button
          onClick={() => setShowNFTs(false)}
          className={`p-2 ${
            !showNFTs && "bg-gray-800"
          } rounded-r-full bg-gray-700 text-white transition-all`}
        >
          FTs
        </button>
      </div>
      <h1 className="text-white mt-10 mb-5 text-3xl font-semibold">Listings</h1>
      {showNFTs
        ? nfts && (
            <div className="grid grid-cols-1 sm:grid-cols-3 xl:grid-cols-4 my-2 gap-5">
              {nfts.map((nft: any) => (
                <NftCard key={nft.uid} nft={nft} />
              ))}
            </div>
          )
        : fts && (
            <div className="grid grid-cols-1 sm:grid-cols-3 xl:grid-cols-4 my-2 gap-5">
              {fts.map((ft: any) => (
                <FTCard key={ft.uid} ft={ft} />
              ))}
            </div>
          )}
    </div>
  );
};

export default Listings;
