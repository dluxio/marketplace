import { atom } from 'recoil';

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

export const refreshState = atom({
  key: 'refreshState',
  default: '',
});
