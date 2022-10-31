'use strict';

var axios = require('axios');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var axios__default = /*#__PURE__*/_interopDefaultLegacy(axios);

var hex = function rnd(repeat) {
  var text = '';
  var possible = '0123456789abcdef';
  var len = possible.length;
  for (var i = 0; i < repeat; i += 1) {
    text += possible.charAt(Math.floor(Math.random() * len));
  }
  return text;
};

/* eslint-disable */

/* axios@0.21.4 */

function isArray(val) {
  return toString.call(val) === '[object Array]';
}
function isPlainObject(val) {
  if (toString.call(val) !== '[object Object]') {
    return false;
  }
  var prototype = Object.getPrototypeOf(val);
  return prototype === null || prototype === Object.prototype;
}
function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  // Force an array if not already something iterable
  if (typeof obj !== 'object') {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }
  if (isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}
function /* obj1, obj2, obj3, ... */
merge() {
  var result = {};
  function assignValue(val, key) {
    if (isPlainObject(result[key]) && isPlainObject(val)) {
      result[key] = merge(result[key], val);
    } else if (isPlainObject(val)) {
      result[key] = merge({}, val);
    } else if (isArray(val)) {
      result[key] = val.slice();
    } else {
      result[key] = val;
    }
  }
  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}
var utils = {
  isArray: isArray,
  forEach: forEach,
  merge: merge
};

function getTokenFromLocalStorage() {
  const tokens = {};
  const authn = localStorage.getItem('x-authn');
  if (authn) {
    tokens['x-authn'] = authn;
  }
  return tokens;
}
function setTokenToLocalStorage(values) {
  Object.keys(values).forEach(function (key) {
    localStorage.setItem(key, values[key]);
  });
}
var token = {
  gets: function getToken() {
    return getTokenFromLocalStorage();
  },
  sets: function setToken(values) {
    setTokenToLocalStorage(values);
  }
};

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

const $http = axios__default["default"].create({});
$http.interceptors.request.use(function (config) {
  const tokens = token.gets();
  Object.keys(tokens).forEach(function (key) {
    config.headers[key] = tokens[key]; // eslint-disable-line no-param-reassign
  });

  return config;
}); // eslint-disable-line function-paren-newline

$http.interceptors.response.use(onSuccess, onError);

// sugar
$http._get = $http.get;
$http.get = function (endpoint) {
  let query = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  let options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  return $http._get(endpoint, utils.merge(options, {
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
  return $http._post(endpoint, data, utils.merge(options, {
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
  return $http._put(endpoint, data, utils.merge(options, {
    params: query
  }));
};
$http._delete = $http.delete;
$http.delete = function (endpoint) {
  let query = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  let options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  return $http._delete(endpoint, utils.merge(options, {
    params: query
  }));
};

(function webTokenByLocalStorage() {
  if (localStorage && localStorage.getItem && localStorage.setItem) {
    (function () {
      const value = localStorage.getItem('x-authn');
      if (value) {
        $http.defaults.headers.common['x-authn'] = value;
      }
      $http.interceptors.response.use(function (resp) {
        if (resp.headers && resp.headers['x-set-authn']) {
          const webtoken = resp.headers['x-set-authn'];
          $http.defaults.headers.common['x-authn'] = webtoken;
          localStorage.setItem('x-authn', webtoken);
        }
        return resp;
      }, function (error) {
        return Promise.reject(error);
      }); // eslint-disable-line function-paren-newline
    })();
  }
})();

(function jaegerTracing() {
  $http.interceptors.request.use(function (config) {
    const traceId = hex(16);
    const spanId = hex(16);
    const parentSpanId = traceId;
    const flag = '01'; // TODO: sampling

    {
      const header = 'uber-trace-id';
      config.headers[header] = "".concat(traceId, ":").concat(spanId, ":").concat(parentSpanId, ":").concat(flag); // eslint-disable-line no-param-reassign
    }

    return config;
  }); // eslint-disable-line function-paren-newline
})();

module.exports = $http;
