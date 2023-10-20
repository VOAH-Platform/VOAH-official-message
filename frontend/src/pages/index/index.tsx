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

import { IndexWrapper } from './style';

import './style.scss';
import { getMessage, getMessageBody } from '@/utils/getMessage';
import { header } from '@/utils/setting';
import { postMessage, postMessageBody } from '@/utils/postMessage';
// import { is } from 'date-fns/locale';

// import { MessageStateData, UserStateData } from '@/components/Message/states';

// TODO: 위치 바꿔야함
interface MessageData {
  id: number;
  priority: number; // 0: default, 1: important, 2: emergency
  Content: string;
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

function fetchMessageData(): MessageData {
  return {
    id: 1,
    priority: 1, //남겨
    Content: '안녕 친구들 안녕 친구들',
    AuthorID: '11111',
    ChannelID: 'sadasd',
    'created-at': '2023-10-19T09:04:01.597615Z',
    'updated-at': '2023-10-19T09:04:01.597615Z',
    attachment: [
      //남겨,
      {
        type: 'image',
        url: 'https://example.com',
      },
    ],
  };
}

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
      let hour = textday.getHours() - 12;
      if (hour < 10) {
        res += ' 오후 0' + hour + ':';
      } else {
        res += ' 오후 ' + hour + ':';
      }
    } else {
      let hour = textday.getHours();
      if (hour < 10) {
        res += ' 오전 0' + hour + ':';
      } else {
        res += ' 오전 ' + hour + ':';
      }
    }
    if (textday.getMinutes() > 10) {
      let hour = textday.getMinutes();
      res += hour;
    } else {
      let hour = textday.getMinutes();
      res += '0' + hour;
    }
    return res;
  };

  const before_list = (messages: any) => {
    const user_info = fetchCoreData() as CoreData;
    return messages.map((content: any, index: any) => (
      <Message
        key={index}
        order={index}
        length={messages.length - 1}
        userId={user_info.user.displayname}
        priority={content.priority}
        messageContent={content.Content}
        messageDate={calcDate(content['created-at'])}
        isMessageEdited={content['created-at'] === content['updated-at']}
        isMessageAnswering={true}
        AnsweringUserId={'홍길동'}
        AnsweringMessage={'왜 벌써 개학임? 집가고싶다.'}
        attachmentType={content.attachment[0].type}
        attachmentUrl={content.attachment[0].url}
      />
    ));
  };

  const intersectionObserver = new IntersectionObserver((entries) => {
    // console.log(entries[0].intersectionRatio);
    if (entries[0].intersectionRatio > 0) {
      intersectionObserver.disconnect();
      // console.log(entries[0].intersectionRatio);
      const sample = [];
      for (let i = 0; i < 2; i++) {
        sample.push(fetchMessageData());
      }
      const user_info = fetchCoreData() as CoreData;
      const n = sample.map((content, index) => (
        <Message
          key={Math.random()}
          order={index}
          length={messages.length - 1}
          userId={user_info.user.displayname}
          priority={content.priority}
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
      setMessage_list((prev_message: any[]) => [...n, ...prev_message]);
    }
    observe_target = document.querySelector('.this') as Element;
    return;
  });

  // let message_list = before_list.reverse();
  const [message_list, setMessage_list] = useState(
    before_list(messages).reverse(),
  );
  // console.log(message_list);
  // console.log(observe_target + '이거에유');

  const divRef = useRef<HTMLDivElement>(null);

  const element = document.documentElement;

  const handleTextAreaHeightChange = (height: unknown) => {
    const isScrollAtBottom =
      element.scrollHeight - element.scrollTop >= element.clientHeight;
    const newMargin = height + 'px';

    // console.log(
    //   element.scrollHeight,
    //   element.scrollTop,
    //   element.clientHeight,
    //   isScrollAtBottom,
    // );

    if (divRef.current) {
      divRef.current.style.marginBottom = newMargin;
    }
    if (isScrollAtBottom) {
      // window.scrollTo(0, element.scrollHeight);
      element.scrollTop = element.scrollHeight;
    }
  };

  const apiKey =
    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTc3NzE3NDAsInV1aWQiOiIxYTgyOGZhNC04ZDc2LTQxNzAtOGY2MS05MjdiMWI3YjNhZmQifQ.mj4Lf_NcSfBO4XWTAWTLCTlnohT10IYRvr4ssc_Nraw';

  const fetchData = async () => {
    try {
      const data = await getMessage(
        'https://test-voah-message.zirr.al/api/chat',
        {
          'channel-id': '5264cbbc-0f43-4bad-a3a3-3616072fb6c1',
          count: 50,
          page: 1,
        } as getMessageBody,
        {
          Authorization: apiKey,
          'Content-Type': 'application/json',
        } as header,
      );

      for (const i in data.chats) {
        console.log(
          `i: ${i} and data.chats[i]: ${data.chats[i]} and data.chats[i]["Content"]: ${data.chats[i]['Content']}`,
        );
        console.log(data.chats[i]);
      }
      console.log(data);
      console.log(data.chats);
      console.log(JSON.stringify(data.chats));
    } catch (error: any) {
      console.error('Error fetching data:', error.message || error);
    }
  };

  const postData = async () => {
    try {
      const data = await postMessage(
        'https://test-voah-message.zirr.al/api/chat/send',
        {
          content: 'test message from browser',
          'channel-id': '5264cbbc-0f43-4bad-a3a3-3616072fb6c1',
        } as postMessageBody,
        {
          Authorization: apiKey,
          'Content-Type': 'application/json',
        } as header,
      );

      console.log(data);
    } catch (error: any) {
      console.error('Error fetching data:', error.message || error);
    }
  };

  useEffect(() => {
    fetchData();
    postData();
  }, []);

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
        showSelectMessageState={false}
        onChange={handleTextAreaHeightChange}
      />
    </IndexWrapper>
  );
}
