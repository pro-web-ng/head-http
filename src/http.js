import axios from 'axios';
import { merge } from './axios/lib/utils';
import { onSuccess, onError } from './response';


export default function $create(opts) {
  const $http = axios.create(opts);


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


  return $http;
}
