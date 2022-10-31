'use strict';

var axios = require('axios');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var axios__default = /*#__PURE__*/_interopDefaultLegacy(axios);

// a node.js module fork of
// parseUri 1.2.2
// (c) Steven Levithan <stevenlevithan.com>
// MIT License
// see: http://blog.stevenlevithan.com/archives/parseuri
// see: http://stevenlevithan.com/demo/parseuri/js/

// forked into a node.js module by franz enzenhofer
// downloaded from https://www.npmjs.com/package/parseUri by hbrls

function parseUri (str) {
  var o   = parseUri.options,
    m   = o.parser[o.strictMode ? "strict" : "loose"].exec(str),
    uri = {},
    i   = 14;

  while (i--) uri[o.key[i]] = m[i] || "";

  uri[o.q.name] = {};
  uri[o.key[12]].replace(o.q.parser, function ($0, $1, $2) {
    if ($1) uri[o.q.name][$1] = $2;
  });

  return uri;
}
parseUri.options = {
  strictMode: false,
  key: ["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","anchor"],
  q:   {
    name:   "queryKey",
    parser: /(?:^|&)([^&=]*)=?([^&]*)/g
  },
  parser: {
    strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
    loose:  /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
  }
};

var parseUri_1 = parseUri;

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

$http.defaults.proxy = {
  // proto: 'http',
  host: '127.0.0.1',
  port: 57386
};
(function x() {
  $http.interceptors.request.use(function (config) {
    const {
      protocol,
      host,
      path: pathname,
      queryKey: query
    } = parseUri_1(config.url); // eslint-disable-line object-curly-newline
    config.headers['x-forwarded-proto'] = protocol; // eslint-disable-line no-param-reassign
    config.headers['x-forwarded-host'] = host; // eslint-disable-line no-param-reassign
    config.url = "http://".concat(config.proxy.host, ":").concat(config.proxy.port).concat(pathname); // eslint-disable-line no-param-reassign
    console.log(config, query); // eslint-disable-line no-console
    return config;
  }); // eslint-disable-line function-paren-newline
})();

function conf(proxy) {
  const {
    host,
    port
  } = parseUri_1(proxy); // eslint-disable-line object-curly-newline
  const config = {
    proxy: {
      host,
      port
    }
  };
  const $ = {};
  utils.forEach(['get', 'delete'], function (method) {
    $[method] = function (endpoint) {
      let query = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      let options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      $http[method](endpoint, query, utils.merge(options, config));
    };
  });
  utils.forEach(['post', 'put'], function (method) {
    $[method] = function () {
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
      $http[method](endpoint, query, data, utils.merge(options, config));
    };
  });
  return $;
}
utils.forEach(['get', 'post', 'put', 'delete'], function (method) {
  conf[method] = $http[method];
});
conf.$http = $http;

module.exports = conf;
