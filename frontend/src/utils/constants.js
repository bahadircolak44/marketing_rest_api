const {
  REACT_APP_SERVER_HOST,
  REACT_APP_SERVER_PORT,
} = process.env;

const HTTP_PROTOCOL = window.location.protocol;
export const SERVER_HOST = REACT_APP_SERVER_HOST;
export const SERVER_PORT = REACT_APP_SERVER_PORT;
export const SERVER_URL = `${HTTP_PROTOCOL}//${SERVER_HOST}:${SERVER_PORT}`;

export const SERVER_API_URL = `${SERVER_URL}/api/v1`;
export const REQUEST_TIMEOUT = 1 * 60 * 1000;
