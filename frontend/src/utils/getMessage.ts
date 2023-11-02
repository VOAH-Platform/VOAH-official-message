import axios, { AxiosRequestConfig } from 'axios';

import { header } from './setting';

export interface getMessageBody {
  'channel-id': string;
  count: number;
  page: number;
}

export type ChatData = {
  id: number;
  Content: string;
  Priority: string;
  AuthorID: string;
  ChannelID: string;
  'created-at': string;
  'updated-at': string;
};

export const getMessage = (
  url: string,
  body: getMessageBody,
  header: header,
) => {
  const axiosConfig: AxiosRequestConfig = {
    headers: {
      ...header,
    },
    params: body,
  };

  return axios
    .get(url, axiosConfig)
    .then((response) => {
      // console.log(response.data);
      const data = response.data as {
        chats: Array<ChatData>;
        success: boolean;
      };
      return data;
    })
    .catch((error) => {
      console.error('Error:', error.message || error);
      return {
        chats: [] as Array<ChatData>,
        success: false,
      };
    });
};
