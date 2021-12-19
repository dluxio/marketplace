import React, { useEffect, useState } from "react";

import { useRouter } from "next/router";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { apiLinkState } from "../../atoms";
import { SetCard } from "../../components/SetCard";

const SetPage = () => {
  const [nfts, setNfts] = useState([]);
  const apiLink: string = useRecoilValue(apiLinkState);
  const router = useRouter();
  const { setName } = router.query;

  useEffect(() => {
    if (!setName) router.push("/");

    axios.get(`${apiLink}api/set/${setName}`).then(({ data }) => {
      console.log(data);
      setNfts(data.result);
    });
  }, []);

  return (
    <div className="mx-10 my-10">
      <div className="flex justify-center text-white text-3xl my-10">
        <h1>{setName}</h1>
      </div>
      {nfts && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 my-2 gap-5">
          {nfts.map((nft: any) => (
            <SetCard key={nft.uid} nft={nft} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SetPage;
