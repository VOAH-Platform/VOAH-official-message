import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

import { THEME_TOKEN } from './constant';

export const themeAtom = atomWithStorage('theme', {
  token: THEME_TOKEN.SYSTEM,
  isDark: false,
});

export const userAtom = atomWithStorage<{
  accessToken: string;
  id: string;
  profile: {
    'user-id': string;
    email: string;
    username: string;
    displayname: string;
    position: string;
    description: string;
    'team-id': string;
    roles: unknown;
    projects: unknown[];
    'created-at': string;
  };
}>('user', {
  accessToken: '',
  id: '',
  profile: {
    'user-id': '',
    email: '',
    username: '',
    displayname: '',
    position: '',
    description: '',
    'team-id': '',
    roles: [],
    projects: [],
    'created-at': '',
  },
});

export const connectAtom = atom<MessagePort | null>(null);
