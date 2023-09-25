'use strict';

var axios = require('axios');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var axios__default = /*#__PURE__*/_interopDefaultLegacy(axios);

/* eslint-disable */
/* axios@1.3.6 */

const kindOf = (cache => thing => {
  const str = toString.call(thing);
  return cache[str] || (cache[str] = str.slice(8, -1).toLowerCase());
})(Object.create(null));
const {
  isArray
} = Array;
const isPlainObject = val => {
  if (kindOf(val) !== 'object') {
    return false;
  }
  const prototype = Object.getPrototypeOf(val);
  // https://github.com/axios/axios/pull/5036
  return prototype === null || prototype === Object.prototype /* || Object.getPrototypeOf(prototype) === null */;
  // && !(Symbol.toStringTag in val)
  // && !(Symbol.iterator in val);
};

function forEach(obj, fn) {
  let {
    allOwnKeys = false
  } = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }
  let i;
  let l;

  // Force an array if not already something iterable
  if (typeof obj !== 'object') {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }
  if (isArray(obj)) {
    // Iterate over array values
    for (i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    const keys = allOwnKeys ? Object.getOwnPropertyNames(obj) : Object.keys(obj);
    const len = keys.length;
    let key;
    for (i = 0; i < len; i++) {
      key = keys[i];
      fn.call(null, obj[key], key, obj);
    }
  }
}
function merge( /* obj1, obj2, obj3, ... */
) {
  const result = {};
  const assignValue = (val, key) => {
    const targetKey = key;
    if (isPlainObject(result[targetKey]) && isPlainObject(val)) {
      result[targetKey] = merge(result[targetKey], val);
    } else if (isPlainObject(val)) {
      result[targetKey] = merge({}, val);
    } else if (isArray(val)) {
      result[targetKey] = val.slice();
    } else {
      result[targetKey] = val;
    }
  };
  for (let i = 0, l = arguments.length; i < l; i++) {
    arguments[i] && forEach(arguments[i], assignValue);
  }
  return result;
}

const XHEADERS = /^x-|content-disposition/i; // eslint-disable-line import/prefer-default-export

function onSuccess(response) {
  // console.log('interceptors.response', response);
  const {
    data,
    status,
    headers: fullHeaders
  } = response;
  if (typeof data === 'string') {
    return Promise.resolve({
      status,
      data
    });
  } else {
    const headers = {};
    let hasHeaders = false;
    Object.keys(fullHeaders).forEach(h => {
      if (XHEADERS.test(h)) {
        headers[h] = fullHeaders[h];
        hasHeaders = true;
      }
    });
    if (Object.prototype.hasOwnProperty.call(data, 'code') && Object.prototype.hasOwnProperty.call(data, 'message')) {
      // eslint-disable-line no-lonely-if
      data.status = status;
      if (hasHeaders) {
        data.headers = headers;
      }
      return Promise.resolve(data);
    } else {
      const resp = {
        code: 0,
        message: 'ok',
        status,
        data
      }; // eslint-disable-line object-curly-newline
      if (hasHeaders) {
        resp.headers = headers;
      }
      return Promise.resolve(resp);
    }
  }
}
function onError(error) {
  // console.log('interceptors.error', error);
  const {
    data,
    status
  } = error.response;
  if (typeof data === 'string') {
    return Promise.reject({
      status,
      data
    }); // eslint-disable-line prefer-promise-reject-errors
  } else {
    data.status = status;
    return Promise.reject(data); // eslint-disable-line prefer-promise-reject-errors
  }
}

function $create(opts) {
  const $http = axios__default["default"].create(opts);
  $http.interceptors.response.use(onSuccess, onError);

  // sugar
  $http._get = $http.get;
  $http.get = function (endpoint) {
    let query = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    let options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    return $http._get(endpoint, merge(options, {
      params: query
    }));
  };
  $http._post = $http.post;
  $http.post = function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    const [endpoint,,, options] = args;
    let [, query, data] = args;
    if (!options) {
      if (!data) {
        data = query;
        query = {};
      }
    }
    return $http._post(endpoint, data, merge(options, {
      params: query
    }));
  };
  $http._put = $http.put;
  $http.put = function () {
    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }
    const [endpoint,,, options] = args;
    let [, query, data] = args;
    if (!options) {
      if (!data) {
        data = query;
        query = {};
      }
    }
    return $http._put(endpoint, data, merge(options, {
      params: query
    }));
  };
  $http._delete = $http.delete;
  $http.delete = function (endpoint) {
    let query = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    let options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    return $http._delete(endpoint, merge(options, {
      params: query
    }));
  };
  return $http;
}

module.exports = $create;
