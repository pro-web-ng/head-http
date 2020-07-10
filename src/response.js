import { XHEADERS } from './constants';


export function onSuccess(response) {
  // console.log('interceptors.response', response);
  const { data, status, headers: fullHeaders } = response;
  if (typeof data === 'string') {
    return Promise.resolve({ status, data });
  } else {
    const headers = {};
    let hasHeaders = false;
    Object.keys(fullHeaders).forEach((h) => {
      if (XHEADERS.test(h)) {
        headers[h] = fullHeaders[h];
        hasHeaders = true;
      }
    });

    if (Object.prototype.hasOwnProperty.call(data, 'code') && Object.prototype.hasOwnProperty.call(data, 'message')) { // eslint-disable-line no-lonely-if
      data.status = status;
      if (hasHeaders) {
        data.headers = headers;
      }
      return Promise.resolve(data);
    } else {
      const resp = { code: 0, message: 'ok', status, data }; // eslint-disable-line object-curly-newline
      if (hasHeaders) {
        resp.headers = headers;
      }
      return Promise.resolve(resp);
    }
  }
}


export function onError(error) {
  // console.log('interceptors.error', error);
  const { data, status } = error.response;
  if (typeof data === 'string') {
    return Promise.reject({ status, data }); // eslint-disable-line prefer-promise-reject-errors
  } else {
    data.status = status;
    return Promise.reject(data); // eslint-disable-line prefer-promise-reject-errors
  }
}
