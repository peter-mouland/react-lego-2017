import axios from 'axios';

import { localUrl } from '../utils';

export function checkStatus(response) {
  if (response.status < 200 || response.status >= 500) {
    const error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
  return response;
}

const jsonOpts = (method, data) => ({
  method,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  data: data && JSON.stringify(data)
});

const fetchUrl = (endpoint, opts = {}) => {
  const url = endpoint.indexOf('//') > -1 ? endpoint : `${localUrl}${endpoint}`;
  return axios({ url, ...opts })
    .then(checkStatus)
    .then((response) => response.data)
    .catch((error) => {
      throw new Error('request failed: ' + error);
    });
};

const getJSON = (url, options) => fetchUrl(url, jsonOpts('GET', null, options));
const postJSON = (url, data, options) => fetchUrl(url, jsonOpts('POST', data, options));

export const fetch = {
  url: fetchUrl,
};
export const json = {
  get: getJSON,
  post: postJSON
};
