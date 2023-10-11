import { useAtom } from 'jotai';
import { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { themeAtom } from '@/atom';
import { THEME_TOKEN } from '@/constant';
import { IndexPage } from '@/pages/index';
import { darkTheme, globalStyles } from '@/stitches.config';

import { NotFoundPage } from './pages/404';

function App() {
  const [theme] = useAtom(themeAtom);

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

  globalStyles();
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<IndexPage />} />
        <Route path="/*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
