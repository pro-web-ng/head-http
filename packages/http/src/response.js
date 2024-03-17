import { XHEADERS } from './constants';


export function onFullfilled({ code, message, data, res }) {
  // console.log('interceptors.response.onFullfilled');
  const headers = {};
  Object.keys(res.headers).forEach((h) => {
    if (XHEADERS.test(h)) {
      headers[h] = res.headers[h];
    }
  });
  res.headers = headers;

  return Promise.resolve({ code, message, data, res });
}


export function onRejected(err) {
  // console.log('interceptors.response.onRejected', error);
  return Promise.reject(err);
}
