import { useAtom } from 'jotai';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import { connectAtom, themeAtom, userAtom } from '@/atom';
import { THEME_TOKEN } from '@/constant';
import { darkTheme } from '@/stitches.config';

export function MessageLayout() {
  if (!window.parent) {
    alert('Please use this app in iframe');
    return;
  }

  const [, setConnect] = useAtom(connectAtom);
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

  useEffect(() => {
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
  });

  // const location = useLocation();

  // useEffect(() => {

  // }, [location]);

  return (
    <>
      <Outlet />
    </>
  );
}
