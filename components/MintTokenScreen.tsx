import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { apiLinkState, refreshState, userState } from "../atoms";

import { useRouter } from "next/router";

import { TokenCard } from "./TokenCard";
import { useTranslation } from "next-export-i18n";

export const MintTokenScreen = () => {
  const [mintTokens, setMintTokens] = useState([]);
  const user: any = useRecoilValue(userState);
  const apiLink: string = useRecoilValue(apiLinkState);
  const refresh: string = useRecoilValue(refreshState);
  const { t } = useTranslation();
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
          <h1 className="text-white text-xl w-full text-center">{t("noFT")}</h1>
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 w-4/5 gap-4">
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
