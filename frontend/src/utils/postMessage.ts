import axios, { AxiosRequestConfig } from 'axios';
import { header } from './setting';

export interface postMessageBody {
  content: string;
  'channel-id': string;
}

export const postMessage = (
  url: string,
  body: postMessageBody,
  header: header,
) => {
  const axiosConfig: AxiosRequestConfig = {
    headers: {
      ...header,
    },
  };

  return axios
    .post(url, body, axiosConfig)
    .then((response) => {
    //   console.log(response.data);
      return response.data;
    })
    .catch((error) => {
      console.error('Error:', error.message || error);
      throw error;
    });
};
