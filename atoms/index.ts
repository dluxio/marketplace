import { atom } from 'recoil';

export const currentScreenState = atom({
  key: 'currentScreenState',
  default: 'market',
});

export const userState = atom({
  key: 'userState',
  default: null,
});

export const marketNavState = atom({
  key: 'marketNavState',
  default: 'exchange',
});

export const clientState = atom({
  key: 'clientState',
  default: {},
});

export const nftState = atom({
  key: 'nftListingState',
  default: [],
});
