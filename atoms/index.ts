import { atom } from 'recoil';

export const userState = atom({
  key: 'userState',
  default: null,
});

export const inventoryNavState = atom({
  key: 'inventoryNavState',
  default: 'tokens',
});

export const marketNavState = atom({
  key: 'marketNavState',
  default: 'exchange',
});

export const nftState = atom({
  key: 'nftListingState',
  default: [],
});
