import { localUrl } from '../utils';

export const rawRequest = ({ url, ...options }) => new Promise((resolve, reject) => {
  const request = new XMLHttpRequest();
  request.open(options.method || 'GET', url, true);
  request.onload = function () {
    if (request.status >= 200 && request.status < 400) {
      resolve({ data: request.responseText, status: request.status });
    } else {
      reject(request);
    }
  };

  request.onerror = function (e) {
    reject(e);
  };
  request.send();
});


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
  return rawRequest({ url, ...opts })
    .then(checkStatus)
    .then((response) => response.data)
    .catch((error) => {
    console.log(error)
      throw new Error(`request failed: ${error.message || error}`);
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
