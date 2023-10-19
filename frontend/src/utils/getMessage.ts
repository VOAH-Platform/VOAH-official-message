import axios, { AxiosRequestConfig } from 'axios';

axios.create({
  baseURL: window.location.href,
});

export interface getMessageBody {
  'channel-id': string;
  count: number;
  page: number;
}

export interface getMessageHeader {
  Authorization: string;
  'Content-Type': 'application/json';
}

export const getMessage = (
  url: string,
  body: getMessageBody,
  header: getMessageHeader,
) => {
  const axiosConfig: AxiosRequestConfig = {
    headers: {
      ...header,
    },
    params: body,
  };

  return (
    axios
      .get(url, axiosConfig)
      // .then((response) => {
      //   console.log(response.data);
      // })
      .catch((error) => {
        console.error('Error:', error.message || error);
      })
  );
};

// export const postMessage = ()
