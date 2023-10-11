// import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

import { THEME_TOKEN } from './constant';

export const themeAtom = atomWithStorage('theme', {
  token: THEME_TOKEN.SYSTEM,
  isDark: false,
});
