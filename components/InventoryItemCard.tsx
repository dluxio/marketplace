import React, { MouseEventHandler, useMemo } from "react";

type InventoryNFTProps = {
  nft: any;
  onClick: MouseEventHandler;
};

export const InventoryItemCard = ({ nft, onClick }: InventoryNFTProps) => {
  useMemo(() => {
    fetch(`https://ipfs.io/ipfs/${nft.script}?${nft.uid}`)
      .then((response) => response.text())
      .then((data) => {
        const code = `(//${data}\n)("${nft.uid}")`;
        const SVG = eval(code);
        const imageDiv = document.getElementById(`image-${nft.set}-${nft.uid}`);
        if (imageDiv) imageDiv.innerHTML = SVG.HTML;
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nft]);

  return (
    <div
      onClick={onClick}
      className="p-3 bg-gray-600 rounded-xl border-gray-700 border-4 cursor-pointer"
    >
      <div id={`image-${nft.set}-${nft.uid}`}></div>
    </div>
  );
};
