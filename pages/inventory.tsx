import React from "react";

import { useRecoilValue } from "recoil";
import { userState, inventoryNavState } from "../atoms";

import { InventoryNav } from "../components";

import { MintTokenScreen } from "../components/Screens/MintTokenScreen";
import { CryptoScreen } from "../components/Screens/CryptoScreen";
import { NFTScreen } from "../components/Screens/NFTScreen";
import { DEX } from "../components/DEX/DEX";
import dynamic from "next/dynamic";
import NoSSR from "react-no-ssr";

const Inventory = () => {
  const user: any = useRecoilValue(userState);
  const inventoryPage = useRecoilValue(inventoryNavState);

  return (
    <div>
      <title>{user ? `Inv @${user.name}` : "Inventory"}</title>
      {user && (
        <>
          <InventoryNav />
          <div className="">
            {inventoryPage === "mint" && <MintTokenScreen />}
            {inventoryPage === "nft" && <NFTScreen />}
            {inventoryPage === "tokens" && <CryptoScreen />}
            {inventoryPage === "dex" && (
              <NoSSR>
                <DEX />
              </NoSSR>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default dynamic(() => Promise.resolve(Inventory), { ssr: false });
