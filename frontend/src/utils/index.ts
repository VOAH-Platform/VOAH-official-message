import { getMessage, getMessageBody } from '@/utils/getMessage';
import { header } from '@/utils/setting';
import { postMessage, postMessageBody } from '@/utils/postMessage';

const apiKey =
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTc3OTUxNjksInV1aWQiOiIxYTgyOGZhNC04ZDc2LTQxNzAtOGY2MS05MjdiMWI3YjNhZmQifQ.DNfekeei0XzrVSQt0xjjou5XYh9WURTk9csddy2FBrs';

// let messageCount = 0;

export const fetchData = async () => {
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
      //   messageCount++;
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

export const postData = async () => {
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
