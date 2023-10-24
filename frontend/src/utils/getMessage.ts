import axios, { AxiosRequestConfig } from 'axios';
import { header } from './setting';

export interface getMessageBody {
  'channel-id': string;
  count: number;
  page: number;
}

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
      return response.data;
    })
    .catch((error) => {
      console.error('Error:', error.message || error);
    });
};
