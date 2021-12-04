import React from "react";

import { useRecoilValue } from "recoil";
import { userState, inventoryNavState } from "../atoms";

import { InventoryNav } from "../components";

import { MintTokenScreen } from "../components/MintTokenScreen";
import { CryptoScreen } from "../components/CryptoScreen";
import { NFTScreen } from "../components/NFTScreen";
import { DEX } from "../components/DEX/DEX";
import dynamic from "next/dynamic";
import NoSSR from "react-no-ssr";

const Inventory = () => {
  const user: any = useRecoilValue(userState);
  const inventoryPage = useRecoilValue(inventoryNavState);

  return (
    <div>
      <title>{user ? `Inv-${user.name}` : "Inventory"}</title>
      {user && (
        <>
          <InventoryNav />
          <div className="p-10 sm:p-0">
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
