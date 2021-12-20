import React, { useEffect, useState, useMemo } from "react";

import { useRouter } from "next/router";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { apiLinkState } from "../../atoms";
import { SetCard } from "../../components/SetCard";

const SetPage = () => {
  const [nfts, setNfts] = useState([]);
  const [setData, setSetData] = useState<{logo: string}>({logo: ''});
  const apiLink: string = useRecoilValue(apiLinkState);
  const router = useRouter();
  const { setName } = router.query;

  useEffect(() => {
    if (!setName) router.push("/");

    axios.get(`${apiLink}api/set/${setName}`).then(({ data: data1 }) => {
      setNfts(data1.result);
      console.log(data1)
      const elem = document.getElementById('set-name')
      if(elem && data1) elem.innerHTML = data1.set.name_long

      axios
        .get(`https://ipfs.io/ipfs/${data1.set.script}`)
        .then(({ data: data2 }) => {
          const code = `(//${data2}\n)('0')`;
          const SVG = eval(code);

          console.log(SVG.set);
          setSetData(SVG.set);
        });
    });
  }, []);

  useMemo(() => {
    if (setData) {
      console.log(setData)

      axios.get(`https://ipfs.io/ipfs/${setData.logo}`).then(({data}) => {
        const code = `(//${data}\n)('0')`;
        const SVG = eval(code);

        console.log(SVG)
      })
    }
  }, [setData])

  return (
    <div className="mx-10 my-10">
      <div
        className={`relative overflow-hidden border-2 text-white p-5 rounded-xl border-gray-800 bg-gray-600 flex flex-col sm:flex-row items-center h-full sm:items-start gap-3 w-full`}
      >
        <h1 className='text-xl my-2 font-bold' id='set-name'></h1>
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
