// import { format } from 'date-fns';
import { useAtom } from 'jotai';
import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { themeAtom } from '@/atom';
import { ExampleButton } from '@/components/ExampleButton';
// eslint-disable-next-line import/namespace
import { Message } from '@/components/Message';
import { TextArea } from '@/components/TextArea';
import { THEME_TOKEN } from '@/constant';

import { IndexWrapper } from './style';

import './style.scss';

// import { MessageStateData, UserStateData } from '@/components/Message/states';

// TODO: 위치 바꿔야함
interface MessageData {
  userId: string;
  priority: number; // 0: default, 1: important, 2: emergency
  message: {
    content: string; //내용
    date: number; //입력 시간
    isEdited: boolean; //수정 여부
  };
  attachment: {
    type: string; // image, video, audio, file
    url: string;
  }[];
}

// interface UserData {
//   userId: string;
//   priority: number; // 0: default, 1: important, 2: emergency
//   message: {
//     content: string; //내용
//     date: number; //입력 시간
//     isEdited: boolean; //수정 여부
//   };
//   attachment: {
//     type: string; // image, video, audio, file
//     url: string;
//   }[];
// }

// interface Profile {
//   lastActivity: number; //
//   lastRefresh: number;
//   message: string;
//   user: {
//     userId: string;
//     email: string;
//     username: string;
//     displayname: string;
//     position: string;
//     description: string;
//     teamId: string;
//     // roles: null;
//     // projects: null;
//     createdAt: Date;
//   };
// }

function randomTimestamp() {
  const minTimestamp = Date.parse('2000-01-01T00:00:00Z'); // 시작 타임스탬프 (2000년 1월 1일)
  const maxTimestamp = Date.now(); // 현재 타임스탬프 (현재 시간)

  const randomMillis =
    Math.floor(Math.random() * (maxTimestamp - minTimestamp)) + minTimestamp;

  return randomMillis;
}

function fetchMessageData(): MessageData {
  return {
    userId: 'user123',
    priority: 1,
    message: {
      content: '우리는 성실한 핫산이다!',
      date: randomTimestamp(),
      isEdited: false,
    },
    attachment: [
      {
        type: 'image',
        url: 'https://example.com',
      },
    ],
  };
}

export function IndexPage() {
  const [, setTheme] = useAtom(themeAtom);
  const messages = [];
  let observe_target: Element;
  for (let i = 0; i <= 1; i++) {
    messages.push(fetchMessageData());
  }

  useEffect(() => {
    observe_target = document.querySelector('.this') as Element;
    intersectionObserver.observe(observe_target);
  });

  const calcDate = (tar: number) => {
    const today = new Date(Date.now());
    const textday = new Date(tar);
    let res: string;
    if (today.getDate() - textday.getDate() == 0) {
      res = '오늘';
    } else if (today.getDate() - textday.getDate() == 1) {
      res = '어제';
    } else {
      res = textday.getMonth() + '월 ' + textday.getDate() + '일';
    }
    if (textday.getHours() > 12) {
      res += ' 오후 ' + (textday.getHours() - 12) + ':';
    } else {
      res += ' 오전 ' + textday.getHours() + ':';
    }
    res += textday.getMinutes();
    return res;
  };

  const before_list = messages.map((content, index) => (
    <Message
      key={index}
      order={index}
      length={messages.length - 1}
      userId={content.userId}
      priority={content.priority}
      messageContent={content.message.content}
      messageDate={calcDate(content.message.date)}
      isMessageEdited={true}
      isMessageAnswering={true}
      AnsweringUserId={'홍길동'}
      AnsweringMessage={'왜 벌써 개학임? 집가고싶다.'}
      attachmentType={content.attachment[0].type}
      attachmentUrl={content.attachment[0].url}
    />
  ));

  const intersectionObserver = new IntersectionObserver((entries) => {
    console.log(entries[0].intersectionRatio);
    if (entries[0].intersectionRatio > 0) {
      intersectionObserver.disconnect();
      console.log(entries[0].intersectionRatio);
      const sample = [];
      for (let i = 0; i < 2; i++) {
        sample.push(fetchMessageData());
      }
      const n = sample.map((content, index) => (
        <Message
          key={index}
          order={index}
          length={messages.length - 1}
          userId={content.userId}
          priority={content.priority}
          messageContent={content.message.content}
          messageDate={calcDate(content.message.date)}
          isMessageEdited={true}
          isMessageAnswering={true}
          AnsweringUserId={'홍길동'}
          AnsweringMessage={'추가된거'}
          attachmentType={content.attachment[0].type}
          attachmentUrl={content.attachment[0].url}
        />
      )) as JSX.Element[];
      setMessage_list([n, ...message_list]);
    }
    observe_target = document.querySelector('.this') as Element;
    return;
  });

  // let message_list = before_list.reverse();
  const [message_list, setMessage_list] = useState(before_list.reverse());
  console.log(message_list);
  // console.log(observe_target + '이거에유');

  return (
    <IndexWrapper className="container">
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
      <TextArea
        writingUser={['팬타곤', '틸토언더바', '누구누구']}
        showSelectMessageState={false}
      />
    </IndexWrapper>
  );
}
