import axios from 'axios';
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

$http.get = function (endpoint, query = {}) {
  return $http._get(endpoint, { params: query });
};

$http._delete = $http.delete;

$http.delete = function (endpoint, query = {}) {
  return $http._delete(endpoint, { params: query });
};

export default $http;
