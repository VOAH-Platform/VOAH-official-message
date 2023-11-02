import { useAtom } from 'jotai';

import { connectAtom, themeAtom, userAtom } from '@/atom';
import { THEME_TOKEN } from '@/constant';

export const useConnect = () => {
  if (!window.parent) {
    alert('Please use this app in iframe');
    return;
  }

  const [, setConnect] = useAtom(connectAtom);
  const [, setUser] = useAtom(userAtom);
  const [, setTheme] = useAtom(themeAtom);

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
};
