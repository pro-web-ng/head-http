'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var axios = _interopDefault(require('axios'));

function getTokenFromLocalStorage() {
  var tokens = {};
  var authn = localStorage.getItem('x-authn');

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

var XHEADERS = /^x-|content-disposition/i; // eslint-disable-line import/prefer-default-export

function onSuccess(response) {
  // console.log('interceptors.response', response);
  var data = response.data,
      status = response.status,
      fullHeaders = response.headers;

  if (typeof data === 'string') {
    return Promise.resolve({
      status: status,
      data: data
    });
  } else {
    var headers = {};
    var hasHeaders = false;
    Object.keys(fullHeaders).forEach(function (h) {
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
      var resp = {
        code: 0,
        message: 'ok',
        status: status,
        data: data
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
  var _error$response = error.response,
      data = _error$response.data,
      status = _error$response.status;

  if (typeof data === 'string') {
    return Promise.reject({
      status: status,
      data: data
    }); // eslint-disable-line prefer-promise-reject-errors
  } else {
    data.status = status;
    return Promise.reject(data); // eslint-disable-line prefer-promise-reject-errors
  }
}

var $http = axios.create({});
$http.interceptors.request.use(function (config) {
  var tokens = token.gets();
  Object.keys(tokens).forEach(function (key) {
    config.headers[key] = tokens[key]; // eslint-disable-line no-param-reassign
  });
  return config;
}); // eslint-disable-line function-paren-newline

$http.interceptors.response.use(onSuccess, onError); // sugar

$http._get = $http.get;

$http.get = function (endpoint) {
  var query = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return $http._get(endpoint, {
    params: query
  });
};

$http._delete = $http["delete"];

$http["delete"] = function (endpoint) {
  var query = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return $http._delete(endpoint, {
    params: query
  });
};

(function webTokenByLocalStorage() {
  if (localStorage && localStorage.getItem && localStorage.setItem) {
    (function () {
      var value = localStorage.getItem('x-authn');

      if (value) {
        $http.defaults.headers.common['x-authn'] = value;
      }

      $http.interceptors.response.use(function (resp) {
        if (resp.headers && resp.headers['x-set-authn']) {
          var webtoken = resp.headers['x-set-authn'];
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

module.exports = $http;
