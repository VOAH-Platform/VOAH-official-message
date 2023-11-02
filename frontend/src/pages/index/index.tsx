// import { format } from 'date-fns';
import { useAtom } from 'jotai';
import { useState, useEffect, useRef } from 'react';

// import { useInView } from 'react-intersection-observer';
import { themeAtom } from '@/atom';
import { ExampleButton } from '@/components/ExampleButton';
// eslint-disable-next-line import/namespace
import { Message } from '@/components/Message';
import { TextArea } from '@/components/TextArea';
import { THEME_TOKEN } from '@/constant';
import { fetchData } from '@/utils/index';

import { IndexWrapper } from './style';

import './style.scss';
// import { is } from 'date-fns/locale';

// import { MessageStateData, UserStateData } from '@/components/Message/states';

// TODO: 위치 바꿔야함
export interface MessageData {
  id: number;
  Content: string;
  Priority: number; // 0: default, 1: important, 2: emergency
  AuthorID: string;
  ChannelID: string;
  'created-at': string;
  'updated-at': string;
  attachment: {
    type: string; // image, video, audio, file
    url: string;
  }[];
}

interface CoreData {
  'last-activity': number;
  'last-refresh': number;
  message: string;
  user: {
    'user-id': string;
    email: string;
    username: string;
    displayname: string;
    position: string;
    description: string;
    'team-id': string;
    roles: null;
    projects: null;
    'created-at': string;
  };
}

// {
//     "chats": [
//         {
//             "id": 1,
//             "Content": "정신나간",
//             "AuthorID": "1a828fa4-8d76-4170-8f61-927b1b7b3afd",
//             "ChannelID": "5264cbbc-0f43-4bad-a3a3-3616072fb6c1",
//             "created-at": "2023-10-19T09:02:02.472836Z",
//             "updated-at": "2023-10-19T09:02:02.472836Z"
//         },
//         {
//             "id": 2,
//             "Content": "정신나간",
//             "AuthorID": "1a828fa4-8d76-4170-8f61-927b1b7b3afd",
//             "ChannelID": "5264cbbc-0f43-4bad-a3a3-3616072fb6c1",
//             "created-at": "2023-10-19T09:04:01.597615Z",
//             "updated-at": "2023-10-19T09:04:01.597615Z"
//         }
//     ],
//     "success": true
// {
//             "id": 2,
//             "Content": "정신나간",
//             "AuthorID": "1a828fa4-8d76-4170-8f61-927b1b7b3afd",
//             "ChannelID": "5264cbbc-0f43-4bad-a3a3-3616072fb6c1",
//             "created-at": "2023-10-19T09:04:01.597615Z",
//             "updated-at": "2023-10-19T09:04:01.597615Z"
//         }
//
//
// }

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

// function randomTimestamp() {
//   const minTimestamp = Date.parse('2000-01-01T00:00:00Z'); // 시작 타임스탬프 (2000년 1월 1일)
//   const maxTimestamp = Date.now(); // 현재 타임스탬프 (현재 시간)

//   const randomMillis =
//     Math.floor(Math.random() * (maxTimestamp - minTimestamp)) + minTimestamp;

//   return randomMillis;
// }

// function fetchMessageData(): MessageData {
//   return {
//     id: 1,
//     priority: 1, //남겨
//     Content: '안녕 친구들 안녕 친구들',
//     AuthorID: '11111',
//     ChannelID: 'sadasd',
//     'created-at': '2023-10-19T09:04:01.597615Z',
//     'updated-at': '2023-10-19T09:04:01.597615Z',
//     attachment: [
//       //남겨,
//       {
//         type: 'image',
//         url: 'https://example.com',
//       },
//     ],
//   };
// }

function fetchCoreData(): CoreData {
  return {
    'last-activity': 1693744734,
    'last-refresh': 1693744734,
    message: 'Success',
    user: {
      'user-id': '456328f5-02db-408b-989f-b17566ae0a58',
      email: 'seonwoo0808@implude.kr',
      username: 'PENTAGON',
      displayname: 'PENTAGON',
      position: 'BE',
      description: '',
      'team-id': 'b6732d10-612c-4925-80bb-083b47705177',
      roles: null,
      projects: null,
      'created-at': '2023-09-03T21:38:54.413202+09:00',
    },
  };
}

const calcDate = (tar: string) => {
  const today = new Date(Date.now());
  // console.log(tar);
  const textday = new Date(tar);
  // console.log(textday);
  let res: string;
  // const wow = new Date(textday);
  // console.log(wow);
  if (today.getDate() - textday.getDate() == 0) {
    res = '오늘';
  } else if (today.getDate() - textday.getDate() == 1) {
    res = '어제';
  } else {
    res = textday.getMonth() + '월 ' + textday.getDate() + '일';
  }
  if (textday.getHours() > 12) {
    const hour = textday.getHours() - 12;
    if (hour < 10) {
      res += ' 오후 0' + hour + ':';
    } else {
      res += ' 오후 ' + hour + ':';
    }
  } else {
    const hour = textday.getHours();
    if (hour < 10) {
      res += ' 오전 0' + hour + ':';
    } else {
      res += ' 오전 ' + hour + ':';
    }
  }
  if (textday.getMinutes() > 10) {
    const hour = textday.getMinutes();
    res += hour;
  } else {
    const hour = textday.getMinutes();
    res += '0' + hour;
  }
  return res;
};

export function IndexPage() {
  const [, setTheme] = useAtom(themeAtom);
  let messages: MessageData[] = [];
  let observe_target: Element;
  // let loaded = false;
  // const first = false;
  const divRef = useRef<HTMLDivElement>(null);
  const element = document.documentElement;
  let heighLoaded = false;
  // for (let i = 0; i <= 1; i++) {
  //   messages.push(fetchMessageData());
  // }

  const handleTextAreaHeightChange = (event: number | undefined) => {
    const isScrollAtBottom =
      element.scrollHeight - element.scrollTop > element.clientHeight;
    const newMargin = `${event}px`;
    if (divRef.current) {
      divRef.current.style.marginBottom = newMargin;
    }
    if (!isScrollAtBottom || !heighLoaded) {
      // window.scrollTo(0, element.scrollHeight);
      element.scrollTop = element.scrollHeight;
      heighLoaded = true;
    }
  };

  const [loadObserver, setLoadObserver] = useState(true);

  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  const intersectionObserver = new IntersectionObserver(async (entries) => {
    console.log(entries[0].intersectionRatio);
    if (entries[0].intersectionRatio > 0 && loadObserver) {
      setLoadObserver(false);
      intersectionObserver.disconnect();
      // console.log(entries[0].intersectionRatio);
      const sample = await fetchData();
      if (sample.length === 0) {
        // loaded = true;
        return;
      }
      // for (let i = 0; i < 2; i++) {
      //   sample.push(fetchMessageData());
      // }
      const user_info = fetchCoreData();
      const n = sample.map((content, index) => (
        <Message
          key={Math.random()}
          order={index}
          length={message_list.length}
          userId={user_info.user.displayname}
          priority={content.Priority}
          messageContent={content.Content}
          messageDate={calcDate(content['created-at'])}
          isMessageEdited={true}
          isMessageAnswering={true}
          AnsweringUserId={'홍길동'}
          AnsweringMessage={'왜 벌써 개학임? 집가고싶다.'}
          attachmentType={content.attachment[0].type}
          attachmentUrl={content.attachment[0].url}
        />
      )) as JSX.Element[];
      setMessage_list((prev_message) => [...prev_message, ...n.reverse()]);
    }
    console.log(message_list);
    observe_target = document.querySelector('.this') as Element;
    return;
  });

  // let message_list = before_list.reverse();
  const [message_list, setMessage_list] = useState<JSX.Element[]>([]);
  // console.log(message_list);
  // console.log(observe_target + '이거에유');

  // useEffect(() => {
  //   fetchData();
  // }, []);

  const before_list = async () => {
    const user_info = fetchCoreData();

    // element.scrollTop = element.scrollHeight;
    const sample = await fetchData();
    if (sample.length === 0) {
      // loaded = true;
      return;
    }

    messages = sample.reverse();

    setMessage_list(
      messages.map((content, index) => (
        <Message
          key={Math.random()}
          order={index}
          length={0}
          userId={user_info.user.displayname}
          priority={content.Priority}
          messageContent={content.Content}
          messageDate={calcDate(content['created-at'])}
          isMessageEdited={true}
          isMessageAnswering={true}
          AnsweringUserId={'홍길동'}
          AnsweringMessage={'왜 벌써 개학임? 집가고싶다.'}
          attachmentType={content.attachment[0].type}
          attachmentUrl={content.attachment[0].url}
        />
      )) as JSX.Element[],
    );
  };

  useEffect(() => {
    before_list().catch((err) => console.log(err));
    console.log('집에갈래')
  }, []);

  useEffect(() => {
    // Function to execute after 3 seconds
    const delayedFunction = () => {
      // if (loaded || !first || heighLoaded) return;
      observe_target = document.querySelector('.this') as Element;
      if (observe_target) {
        intersectionObserver.observe(observe_target);
      }
    };

    // Set a 3-second delay
    const delay = 5000; // 3 seconds in milliseconds
    const delayTimeout = setTimeout(delayedFunction, delay);

    // Clear the timeout if the component unmounts or if some condition changes
    return () => clearTimeout(delayTimeout);
  });
  return (
    <IndexWrapper className="container">
      <div ref={divRef}>
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
      </div>
      <TextArea
        writingUser={['팬타곤', '틸토언더바', '누구누구']}
        onChange={handleTextAreaHeightChange}
      />
    </IndexWrapper>
  );
}
