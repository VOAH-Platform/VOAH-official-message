/* eslint-disable no-case-declarations */
import axios from 'axios';
import { useAtom } from 'jotai';
import { useEffect } from 'react';
import { Outlet, useLocation, useParams } from 'react-router-dom';

import { connectAtom, themeAtom, userAtom } from '@/atom';
import { THEME_TOKEN } from '@/constant';
import { darkTheme } from '@/stitches.config';

export function MessageLayout() {
  if (!window.parent) {
    alert('Please use this app in iframe');
    return;
  }

  const [connect, setConnect] = useAtom(connectAtom);
  const [, setUser] = useAtom(userAtom);
  const [theme, setTheme] = useAtom(themeAtom);

  const setDarkTheme = () => {
    document.querySelector('html')!.style.backgroundColor = '#20262b';
    if (!document.body.classList.contains(darkTheme.className))
      document.body.classList.add(darkTheme.className);
  };

  const setLightTheme = () => {
    document.querySelector('html')!.style.backgroundColor = '#ffffff';
    if (document.body.classList.contains(darkTheme.className))
      document.body.classList.remove(darkTheme.className);
  };

  const match = window.matchMedia('(prefers-color-scheme: dark)');

  const { targetId } = useParams();

  useEffect(() => {
    console.log('theme', theme);

    if (theme.token == THEME_TOKEN.SYSTEM) {
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        setDarkTheme();
      } else {
        setLightTheme();
      }
      match.addEventListener('change', (e) => {
        if (e.matches) {
          setDarkTheme();
        } else {
          setLightTheme();
        }
      });
    } else {
      match.removeEventListener('change', () => {});
    }
    if (theme.token == THEME_TOKEN.LIGHT) {
      setLightTheme();
    }
    if (theme.token == THEME_TOKEN.DARK) {
      setDarkTheme();
    }
  }, [theme]);

  const handleMessage = (e: MessageEvent) => {
    const data = e.data as {
      type: string;
      data: unknown;
    };
    console.log('handleMessage', data);

    switch (data.type) {
      case 'VOAH__USER_GET_TOKEN_DONE':
        setUser((prev) => ({
          ...prev,
          accessToken: data.data as string,
        }));
        connect?.postMessage({
          type: 'VOAH__USER_GET_USER',
        });
        break;
      case 'VOAH__USER_GET_USER_DONE':
        const temp = data.data as {
          id: string;
        };
        setUser((prev) => ({
          ...prev,
          id: temp.id,
        }));
        connect?.postMessage({
          type: 'VOAH__USER_GET_PROFILE',
          data: temp.id,
        });
        break;
      case 'VOAH__USER_GET_PROFILE_DONE':
        const temp2 = data.data as {
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
        setUser((prev) => ({
          ...prev,
          profile: temp2,
        }));
        break;
      case 'VOAH__THEME_SET':
        // eslint-disable-next-line no-case-declarations
        const token = data.data as THEME_TOKEN;
        setTheme(() => ({
          token: token,
          isDark: token === THEME_TOKEN.DARK ? true : false,
        }));
        break;
      default:
        break;
    }
  };

  window.addEventListener('message', (e) => {
    const [port2] = e.ports || [];

    if (!port2) {
      alert('Please use this app in iframe');
      return;
    }

    port2.onmessage = handleMessage;
    setConnect(port2);

    port2.postMessage({
      type: 'VOAH__FRAME_INIT_DONE',
    });
    port2.postMessage({
      type: 'VOAH__SIDEBAR_SET_INFO',
      data: {
        title: 'Message',
        desc: 'Message',
        hideDesc: true,
      },
    });
  });

  const location = useLocation();

  useEffect(() => {
    axios
      .get(`${window.location.origin}/api/channel?target-id=${targetId}`)
      .then((res) => {
        const data = res.data as {
          message: string;
          result: Array<null>;
        };
        console.log('data', data);
        return;
      })
      .catch((err) => {
        console.log('error', err);
      });
  }, [location]);

  return (
    <>
      <Outlet />
    </>
  );
}
