import React, { useEffect, useState, useMemo } from "react";

import { useRouter } from "next/router";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { apiLinkState } from "../../atoms";
import { SetCard } from "../../components/SetCard";

const SetPage = () => {
  const [nfts, setNfts] = useState([]);
  const [logoLink, setLogoLink] = useState("");
  const [bannerLink, setBannerLink] = useState("");
  const [setData, setSetData] = useState<{ logo: string }>();
  const apiLink: string = useRecoilValue(apiLinkState);
  const router = useRouter();
  const { setName } = router.query;

  useEffect(() => {
    if (!setName) router.push("/");

    if (setName) {
      axios.get(`${apiLink}api/set/${setName}`).then(({ data: data1 }) => {
        setNfts(data1.result);
        console.log(data1);
        const elem = document.getElementById("set-name");
        if (elem && data1) elem.innerHTML = data1.set?.name_long;

        axios
          .get(`https://ipfs.io/ipfs/${data1.set.script}`)
          .then(({ data: data2 }) => {
            const code = `(//${data2}\n)('0')`;
            const SVG = eval(code);

            console.log(SVG.set);
            setSetData(SVG.set);
            setLogoLink(`https://ipfs.io/ipfs/${SVG.set.logo}`);
            setBannerLink(`https://ipfs.io/ipfs/${SVG.set.banner}`);
          });
      });
    }
  }, []);

  useMemo(() => {
    if (setData) {
    }
  }, [setData]);

  return (
    <div className="mx-10 my-10">
      <div
        className={`relative overflow-hidden border-2 text-white p-5 rounded-xl border-gray-800 bg-gray-600 flex flex-col sm:flex-row items-center h-full sm:items-start gap-3 w-full`}
        style={{
          backgroundImage: `url(${bannerLink})`,
          backgroundSize: "auto",
        }}
      >
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-60 z-20" />
        <div className="flex flex-col items-center z-30">
          <img className="w-36" src={logoLink} alt="set-logo" />
          <h1 className="text-xl my-2 font-bold" id="set-name"></h1>
        </div>
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
