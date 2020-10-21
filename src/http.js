import axios from 'axios';
import { merge } from './axios/lib/utils';
import token from './token';
import { onSuccess, onError } from './response';


const $http = axios.create({
});


$http.interceptors.request.use(
  function (config) {
    const tokens = token.gets();
    Object.keys(tokens).forEach(function (key) {
      config.headers[key] = tokens[key]; // eslint-disable-line no-param-reassign
    });
    return config;
  }); // eslint-disable-line function-paren-newline


$http.interceptors.response.use(onSuccess, onError);


// sugar
$http._get = $http.get;

$http.get = function (endpoint, query = {}, options = {}) {
  return $http._get(endpoint, merge(options, { params: query }));
};

$http._post = $http.post;

$http.post = function (...args) {
  const [endpoint, , , options] = args;
  let [, query, data] = args;
  if (!options) {
    if (!data) {
      data = query;
      query = {};
    }
  }
  return $http._post(endpoint, data, merge(options, { params: query }));
};

$http._put = $http.put;

$http.put = function (...args) {
  const [endpoint, , , options] = args;
  let [, query, data] = args;
  if (!options) {
    if (!data) {
      data = query;
      query = {};
    }
  }
  return $http._put(endpoint, data, merge(options, { params: query }));
};

$http._delete = $http.delete;

$http.delete = function (endpoint, query = {}, options = {}) {
  return $http._delete(endpoint, merge(options, { params: query }));
};

export default $http;
