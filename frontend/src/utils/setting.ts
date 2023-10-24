import axios from 'axios';

axios.create({
  baseURL: window.location.href,
});

export interface header {
  Authorization: string;
  'Content-Type': 'application/json';
}
