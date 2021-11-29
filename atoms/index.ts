import { atom } from "recoil";

export const userState = atom({
  key: "userState",
  default: null,
});

export const inventoryNavState = atom({
  key: "inventoryNavState",
  default: "nft",
});

export const marketNavState = atom({
  key: "marketNavState",
  default: "exchange",
});

export const coinState = atom({
  key: "coinState",
  default: [],
});

export const prefixState = atom({
  key: "prefixState",
  default: "dlux_",
});

export const broadcastState = atom({
  key: "broadcastState",
  default: [],
});

export const inventoryNFTState = atom({
  key: "InventoryNFTState",
  default: [],
});

export const refreshState = atom({
  key: "refreshState",
  default: "",
});

export const apiLinkState = atom({
  key: "apiLinkState",
  default: "https://token.dlux.io/",
});

export const ipfsLinkState = atom({
  key: "ipfsLinkState",
  default: "https://anywhere.ipfs.dlux.io/",
});

export const dlux_ccState = atom({
  key: "dlux_ccState",
  default: "",
});

export const dayVolumeState = atom({
  key: "dayVolumeState",
  default: {
    dlux: "0",
    dollars: 0,
  },
});
