import axios from 'axios';
import { SERVER_API_URL, REQUEST_TIMEOUT } from './constants';

// axios.defaults.timeout = REQUEST_TIMEOUT;
// axios.defaults.baseURL = SERVER_API_URL;
// axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

export default axios.create({
  baseURL: SERVER_API_URL,
  timeout:REQUEST_TIMEOUT,
  headers: {
    "Content-type": "application/json"
  }
});

