import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { apiLinkState, refreshState, userState } from "../atoms";

import { useRouter } from "next/router";

import { TokenCard } from "./TokenCard";

export const MintTokenScreen = () => {
  const [mintTokens, setMintTokens] = useState([]);
  const user: any = useRecoilValue(userState);
  const apiLink: string = useRecoilValue(apiLinkState);
  const refresh: string = useRecoilValue(refreshState);
  const router = useRouter();

  useEffect(() => {
    if (refresh === "inventory" || refresh === "") {
      if (user) {
        const name = user.name;
        axios.get(`${apiLink}api/nfts/${name}`).then((response) => {
          setMintTokens(response.data.mint_tokens);
        });
      } else {
        router.push("/");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh]);

  return (
    <div className="mx-10">
      {mintTokens.length === 0 && (
        <div className="w-full flex justify-center items-center">
          <h1 className="text-white text-xl w-full text-center">
            You don&apos;t have any unminted tokens
          </h1>
        </div>
      )}
      <div className="grid-comp">
        {mintTokens.map((token: any) => (
          <div key={token.set}>
            <TokenCard
              key={"_" + Math.random().toString(36).substr(2, 9)}
              token={token}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
