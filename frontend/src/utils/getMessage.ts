import axios, {AxiosHeaders} from 'axios';

interface getMessageBody {
  'channel-id': string;
  count: number;
  page: number;
}

interface getMessageHeader extends AxiosHeaders{
  Authorization: string;
  'Content-Type': 'application/json';
}

export const getMessage = (
  url: string,
  body: getMessageBody,
  header: getMessageHeader,
) => {
  return axios
    .get(url, { headers: header, params: body })
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.error('Error:', error.message || error);
    });
};
