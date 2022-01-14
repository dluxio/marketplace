import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { InventoryItemCard, NftDetails } from "..";
import {
  apiLinkState,
  inventoryNFTState,
  refreshState,
  userState,
} from "../../atoms";

import axios from "axios";
import { useRouter } from "next/router";
import { useTranslation } from "next-export-i18n";

export const NFTScreen = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const user: any = useRecoilValue(userState);
  const apiLink: string = useRecoilValue(apiLinkState);
  const [nftDetail, setNftDetail] = useState<any>();
  const refresh: string = useRecoilValue(refreshState);
  const [inventoryNFTs, setInventoryNFTs] =
    useRecoilState<any>(inventoryNFTState);

  useEffect(() => {
    if (refresh === "inventory" || refresh === "") {
      if (user) {
        const name = user.name;
        axios.get(`${apiLink}api/nfts/${name}`).then((response) => {
          setInventoryNFTs(response.data.result);
        });
      } else {
        router.push("/");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh]);

  useEffect(() => {
    if (inventoryNFTs.length) {
      setNftDetail(inventoryNFTs[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inventoryNFTs]);

  const handleNftClick = (nft: any) => {
    setNftDetail(nft);
  };

  return (
    <div className="flex h-auto flex-col gap-8 sm:flex-row">
      <div className="w-full">
        {inventoryNFTs.length === 0 && (
          <h1 className="text-white text-xl text-center">{t("noNFT")}</h1>
        )}
        <div className="grid grid-cols-1 grid-row-auto sm:grid-cols-2 xl:grid-cols-4 w-4/5 gap-4 mx-auto sm:mx-10">
          {inventoryNFTs.map((nft: any) => (
            <InventoryItemCard
              key={`${nft.set}_${nft.uid}`}
              nft={nft}
              onClick={() => {
                handleNftClick(nft);
              }}
              onDoubleClick={() => router.push(`/nft/${nft.set}:${nft.uid}`)}
            />
          ))}
        </div>
      </div>
      {nftDetail && (
        <div id="details" className="w-full mx-auto sm:mx-10">
          <NftDetails nft={nftDetail} />
        </div>
      )}
    </div>
  );
};
