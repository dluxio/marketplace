import React, { useEffect, useState, useMemo } from "react";

import { useRouter } from "next/router";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { apiLinkState } from "../../atoms";
import { SetCard } from "../../components/SetCard";
import { FaInfoCircle } from "react-icons/fa";
import { BsFillPersonFill } from "react-icons/bs";

const SetPage = () => {
  const [nfts, setNfts] = useState([]);
  const [minMax, setMinMax] = useState<number[]>([]);
  const [author, setAuthor] = useState("");
  const [logoLink, setLogoLink] = useState("");
  const [bannerLink, setBannerLink] = useState("");
  const [colors, setColors] = useState<string[]>([]);
  const [setData, setSetData] =
    useState<{ logo: string; Description: string }>();
  const apiLink: string = useRecoilValue(apiLinkState);
  const router = useRouter();
  const { setName } = router.query;

  useEffect(() => {
    if (!setName) router.push("/");

    if (setName) {
      axios
        .get(`${apiLink}api/set/${setName}`)
        .then(({ data: { set, result } }) => {
          setNfts(result);
          const elem = document.getElementById("set-name");
          if (elem && set) elem.innerHTML = set?.name_long;
          const bondElem = document.getElementById("bond-amount");
          const royaltyElem = document.getElementById("royalty-amount");
          setAuthor(set.author);
          setMinMax([set.minted, set.max]);

          if (royaltyElem) royaltyElem.innerHTML = `${set.royalty / 100} %`;
          if (bondElem)
            bondElem.innerHTML = `${parseFloat(
              (set.bond.amount / Math.pow(10, set.bond.precision)).toString()
            ).toFixed(set.bond.precision)} ${set.bond.token}`;

          axios
            .get(`https://ipfs.io/ipfs/${set.script}`)
            .then(({ data: data2 }) => {
              const code = `(//${data2}\n)('0')`;
              const SVG = eval(code);
              setColors([SVG.set.Color1, SVG.set.Color2]);

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
        <div className="flex flex-col sm:flex-row gap-5 z-30">
          <div className="flex flex-col justify-center items-center ">
            <img className="w-36 rounded-xl" src={logoLink} alt="set-logo" />
            <h1 className="text-xl my-2 font-bold" id="set-name"></h1>
          </div>
          <div className="flex gap-2 flex-col justify-center text-xl text-white">
            {setData && (
              <>
                <div className="sm:flex hidden gap-3 items-center">
                  <FaInfoCircle />
                  <h1>
                    {setData.Description.length > 90
                      ? setData.Description.slice(0, 90) + "..."
                      : setData.Description}
                  </h1>
                </div>
                <div className="flex gap-3 items-center">
                  <BsFillPersonFill />
                  <h1
                    className="hover:text-gray-300 cursor-pointer"
                    onClick={() => router.push(`/@${author}`)}
                  >
                    {author}
                  </h1>
                </div>
              </>
            )}
            <div className="flex gap-3 items-center">
              <h1 className="font-bold">Bond: </h1>
              <h1
                style={{
                  background: `linear-gradient(to bottom,  ${colors[0]} 0%,${colors[1]} 100%)`,
                }}
                className="p-1 bg-gray-400 rounded-xl"
                id="bond-amount"
              ></h1>
            </div>
            <div className="flex gap-3 items-center">
              <h1 className="font-bold">Royalty:</h1>
              <h1
                style={{
                  background: `linear-gradient(to bottom,  ${colors[0]} 0%,${colors[1]} 100%)`,
                }}
                className="p-1 bg-gray-400 rounded-xl"
                id="royalty-amount"
              ></h1>
            </div>
            <div>
              <div className="flex gap-2 items-center">
                <h1 className="font-bold">Minted:</h1>
                <h1>
                  {minMax[0]}/{minMax[1]}
                </h1>
              </div>
              <div className="rounded-xl w-full bg-gray-400 border-2 border-gray-800">
                <div
                  className="p-1 w-full rounded-xl"
                  style={{
                    background: `linear-gradient(to right,  ${colors[0]} 0%,${colors[1]} 100%)`,
                    width: `${(minMax[0] * 100) / minMax[1]}%`,
                  }}
                ></div>
              </div>
            </div>
          </div>
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
