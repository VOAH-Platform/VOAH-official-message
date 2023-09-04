import { useAtom } from 'jotai';

import { themeAtom } from '@/atom';
import { ExampleButton } from '@/components/ExampleButton';
// eslint-disable-next-line import/namespace
import { Message } from '@/components/Message';
import { MessageStateData, UserStateData } from '@/components/Message/states';
import { TextArea } from '@/components/TextArea';
import { THEME_TOKEN } from '@/constant';

import { IndexWrapper } from './style';

export function IndexPage() {
  const [, setTheme] = useAtom(themeAtom);
  const messages = [
    '최근문자',
    '안녕',
    '꺼져',
    '응아니야',
    '어쩔',
    '저쩔',
    'ㄴㅇㅊㄿ휴ㅗㅝㅡㅜㅗㅠㅎㅍㄹㅇㅊㄿ휴ㅗㅜㅠㅎㅍㄹㅇㅊㅌㄴㅍ류호ㅜㅠㅎㅍㄹㅇㅊㅌㄴㅇㅊㅍ루ㅗㅠㅎㅍㄹㅊㅇㅍ류호ㅜㅠㅎㅍㄹㅇㅊㅌㄴㅇㅊㅍ류홒ㄹㅇㅊㄴㅍ륳ㅍㄹㅊㅇㄹ흎ㄹㅇㅊㄹ흎ㄹㅇㅊㄹ흂ㅇㄷㄺㅅ호ㅛㅎㄿㅇㄷㄱㅀ솔ㄷㅇㄱ4ㅅ5ㅛ6ㅗㅓㅅㅎㄺㄷ3ㄱ4ㅅ5ㅛㅗㅓㅎㅅㄹㄷㅇㄺㅎ소ㅓㅡㅜㅗㅠㅎㅍㄹㅇㄷㄺ호ㅝㅡㅜㅠㅎㅍㄹㅇㅊㅍ류후ㅗㅠㅎㅍㄹㅇㅊㅍ류호\nsdkfmsmfmskm\n',
  ];
  const times = [1693548656];
  const message_list = messages
    .map((content, index) => (
      <Message
        key={index}
        profileImage={undefined}
        profileState={UserStateData.ONLINE}
        messageState={MessageStateData.DEFAULT}
        writer={'홍길동'}
        date={'8월 14일'}>
        {content}
      </Message>
    ))
    .reverse();

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
      <div>{message_list}</div>
      <TextArea />
    </IndexWrapper>
  );
}
