import axios from 'axios';
import { onSuccess, onError } from './response';


const $http = axios.create({
});


$http.interceptors.response.use(onSuccess, onError);


// sugar
$http._get = $http.get;

$http.get = function (endpoint, query = {}) {
  return $http._get(endpoint, { params: query });
};

$http._delete = $http.delete;

$http.delete = function (endpoint, query = {}) {
  return $http._delete(endpoint, { params: query });
};

// more sugar
function once($, options) {
  return {
    post: (endpoint, command) => $.post(endpoint, command, options),
  };
}

$http.xpl = function () {
  const headers = {};

  let payload = null;
  if (document && document.querySelector) {
    const input = document.querySelector('#_webpayload');
    if (input) {
      const value = input.value;
      if (value) {
        payload = value;
      }
    }
  } else if (localStorage && localStorage.getItem && localStorage.setItem) {
    const item = localStorage.getItem('#_webpayload');
    if (item) {
      payload = item;
    }
  }

  if (payload) {
    headers['X-Pl'] = payload;
  }

  return once($http, { headers });
};

export default $http;
