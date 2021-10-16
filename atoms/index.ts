import { atom } from 'recoil';

import { placeHolder } from '../constants';

export const userState = atom({
  key: 'userState',
  default: null,
});

export const inventoryNavState = atom({
  key: 'inventoryNavState',
  default: 'nft',
});

export const marketNavState = atom({
  key: 'marketNavState',
  default: 'exchange',
});

export const nftState = atom({
  key: 'nftListingState',
  default: [],
});

export const auctionState = atom({
  key: 'auctionState',
  default: [],
});

export const coinState = atom({
  key: 'coinState',
  default: [],
});

export const prefixState = atom({
  key: 'prefixState',
  default: 'dlux_',
});

export const broadcastState = atom({
  key: 'broadcastState',
  default: [],
});

export const inventoryNFTState = atom({
  key: 'InventoryNFTState',
  default: [],
});
