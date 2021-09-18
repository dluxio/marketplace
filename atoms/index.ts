import { atom } from 'recoil';

export const currentScreenState = atom({
  key: 'currentScreenState',
  default: 'market',
});

export const userState = atom({
  key: 'userState',
  default: {},
});

export const marketNavState = atom({
  key: 'marketNavState',
  default: 'exchange',
});
