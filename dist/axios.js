'use strict';

// require('core-js/modules/web.url.to-json.js');

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

function Http(_ref) {
  let {
    instance
  } = _ref;
  // const $axios = axios.create({});
  this.$axios = instance;
  this.$axios.interceptors.response.use(_ref2 => {
    let {
      config,
      request,
      status,
      statusText,
      headers,
      data
    } = _ref2;
    // eslint-disable-line no-unused-vars
    const res = {
      status,
      statusText,
      headers: headers.toJSON()
    };
    const rfc = {
      code: 0,
      message: 'ok',
      data,
      res
    };
    return Promise.resolve(rfc);
  }, err => {
    // eslint-disable-line arrow-body-style
    // console.log('$axios.intercepters.response.rejected', err); // eslint-disable-line no-console
    return Promise.reject(err);
  }); // eslint-disable-line function-paren-newline
}
Http.prototype.get = function (endpoint) {
  let params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  let headers = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  let options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  return this.$axios.get(endpoint, merge(options, {
    params,
    headers
  }));
};
Http.prototype.post = function (endpoint) {
  let params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  let data = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  let headers = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  let options = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};
  return this.$axios.post(endpoint, data, merge(options, {
    params,
    headers
  }));
};
Http.prototype.put = function (endpoint) {
  let params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  let data = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  let headers = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  let options = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};
  return this.$axios.put(endpoint, data, merge(options, {
    params,
    headers
  }));
};
Http.prototype.delete = function (endpoint) {
  let params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  let headers = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  let options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  return this.$axios.delete(endpoint, merge(options, {
    params,
    headers
  }));
};
function create($axios) {
  // eslint-disable-line import/prefer-default-export
  const $http = new Http($axios);
  return $http;
}
var index = {
  create
};

module.exports = index;
