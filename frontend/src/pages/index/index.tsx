import { useAtom } from 'jotai';

import { themeAtom } from '@/atom';
import { ExampleButton } from '@/components/ExampleButton';
import { THEME_TOKEN } from '@/constant';

import { IndexWrapper } from './style';

export function IndexPage() {
  const [, setTheme] = useAtom(themeAtom);

  return (
    <IndexWrapper>
      VOAH TEMPLATE
      <ExampleButton
        onClick={() => setTheme({ token: THEME_TOKEN.LIGHT, isDark: false })}>
        LIGHT
      </ExampleButton>
      <ExampleButton
        onClick={() => setTheme({ token: THEME_TOKEN.DARK, isDark: true })}>
        DARK
      </ExampleButton>
      <ExampleButton
        onClick={() =>
          setTheme({
            token: THEME_TOKEN.SYSTEM,
            isDark: window.matchMedia('(prefers-color-scheme: dark)').matches,
          })
        }>
        SYSTEM
      </ExampleButton>
    </IndexWrapper>
  );
}
