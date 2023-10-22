import { getMessage, getMessageBody } from '@/utils/getMessage';
import { header } from '@/utils/setting';
import { postMessage, postMessageBody } from '@/utils/postMessage';
import { MessageData } from '@/pages/index';

const apiKey =
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTc5NjIwMDQsInV1aWQiOiIxYTgyOGZhNC04ZDc2LTQxNzAtOGY2MS05MjdiMWI3YjNhZmQifQ.s9jlVc5df28ulrWnblrvBhw6AvrkZILeCUW6M9ZoLzY';

let messageCount = 0;
let pageCount = 1;
let loadDone = false;

export const fetchData = async (): Promise<Array<MessageData>> => {
  if (loadDone) {
    return [];
  }
  try {
    const objects: Array<MessageData> = [];
    const data = await getMessage(
      'https://test-voah-message.zirr.al/api/chat',
      {
        'channel-id': '5264cbbc-0f43-4bad-a3a3-3616072fb6c1',
        count: 50,
        page: pageCount,
      } as getMessageBody,
      {
        Authorization: apiKey,
        'Content-Type': 'application/json',
      } as header,
    );

    const prevCount = messageCount;

    for (const i in data.chats) {
      messageCount++;
      // console.log(
      //   `i: ${i} and data.chats[i]: ${data.chats[i]} and data.chats[i]["Content"]: ${data.chats[i]['Content']}`,
      // );
      console.log(data.chats[i]);
      objects.push({
        id: data.chats[i]['id'],
        priority: 1,
        Content: data.chats[i]['Content'],
        AuthorID: data.chats[i]['AuthorID'],
        ChannelID: data.chats[i]['ChannelID'],
        'created-at': data.chats[i]['created-at'],
        'updated-at': data.chats[i]['updated-at'],
        attachment: [
          {
            type: 'image',
            url: 'https://example.com',
          },
        ],
      });
    }

    pageCount++;

    if (messageCount - prevCount < 50) {
      loadDone = true;
      console.log('No more messages');
    }
    // console.log(data);
    // console.log(data.chats);
    // console.log(JSON.stringify(data.chats));
    console.log(`messageCount: ${messageCount} pageCount: ${pageCount}`);

    return objects;
  } catch (error: any) {
    console.error('Error fetching data:', error.message || error);
  }
  return [];
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
