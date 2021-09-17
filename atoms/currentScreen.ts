import { atom } from 'recoil';

export const currentScreenState = atom({
  key: 'currentScreenState',
  default: 'market',
});
