'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var axios = _interopDefault(require('axios'));

var XHEADERS = /^x-|content-disposition/i; // eslint-disable-line import/prefer-default-export

function onSuccess(response) {
  // console.log('interceptors.response', response);
  var data = response.data,
      status = response.status,
      fullHeaders = response.headers;

  if (typeof data === 'string') {
    return Promise.resolve({ status: status, data: data });
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
      var resp = { code: 0, message: 'ok', status: status, data: data };
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
    return Promise.reject({ status: status, data: data });
  } else {
    data.status = status;
    return Promise.reject(data);
  }
}

var $http$1 = axios.create({});

$http$1.interceptors.response.use(onSuccess, onError);

// sugar
$http$1._get = $http$1.get;

$http$1.get = function (endpoint) {
  var query = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  return $http$1._get(endpoint, { params: query });
};

$http$1._delete = $http$1.delete;

$http$1.delete = function (endpoint) {
  var query = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  return $http$1._delete(endpoint, { params: query });
};

(function webTokenByInput() {
  if (document && document.querySelector) {
    (function () {
      var storage = document.querySelector('#_webtoken');
      if (storage) {
        if (storage.value) {
          $http$1.defaults.headers.common['Authorization'] = 'Bearer ' + storage.value; // eslint-disable-line dot-notation
        }

        $http$1.interceptors.response.use(function (resp) {
          // eslint-disable-line prefer-arrow-callback
          if (resp.headers && resp.headers['x-web-token']) {
            var webtoken = resp.headers['x-web-token'];
            $http$1.defaults.headers.common['Authorization'] = 'Bearer ' + webtoken; // eslint-disable-line dot-notation
            storage.value = webtoken;
          }
          return resp;
        }, function (error) {
          // eslint-disable-line prefer-arrow-callback
          return Promise.reject(error);
        });
      }
    })();

    (function () {
      var storage = document.querySelector('#_webtracking');
      if (storage) {
        if (storage.value) {
          $http$1.defaults.headers.common['X-Tk'] = storage.value;
        }

        $http$1.interceptors.response.use(function (resp) {
          // eslint-disable-line prefer-arrow-callback
          if (resp.headers && resp.headers['x-web-tracking']) {
            var webtracking = resp.headers['x-web-tracking'];
            $http$1.defaults.headers.common['X-Tk'] = webtracking;
            storage.value = webtracking;
          }
          return resp;
        }, function (error) {
          // eslint-disable-line prefer-arrow-callback
          return Promise.reject(error);
        });
      }
    })();
  }
})();

(function webTokenByLocalStorage() {
  if (localStorage && localStorage.getItem && localStorage.setItem) {
    (function () {
      var value = localStorage.getItem('#_webtoken');
      if (value) {
        $http$1.defaults.headers.common['Authorization'] = 'Bearer ' + value; // eslint-disable-line dot-notation
      }

      $http$1.interceptors.response.use(function (resp) {
        // eslint-disable-line prefer-arrow-callback
        if (resp.headers && resp.headers['x-web-token']) {
          var webtoken = resp.headers['x-web-token'];
          $http$1.defaults.headers.common['Authorization'] = 'Bearer ' + webtoken; // eslint-disable-line dot-notation
          localStorage.setItem('#_webtoken', webtoken);
        }
        return resp;
      }, function (error) {
        // eslint-disable-line prefer-arrow-callback
        return Promise.reject(error);
      });
    })();

    (function () {
      var value = localStorage.getItem('#_webtracking');
      if (value) {
        $http$1.defaults.headers.common['X-Tk'] = value;
      }

      $http$1.interceptors.response.use(function (resp) {
        // eslint-disable-line prefer-arrow-callback
        if (resp.headers && resp.headers['x-web-tracking']) {
          var webtracking = resp.headers['x-web-tracking'];
          $http$1.defaults.headers.common['X-Tk'] = webtracking;
          localStorage.setItem('#_webtracking', webtracking);
        }
        return resp;
      }, function (error) {
        // eslint-disable-line prefer-arrow-callback
        return Promise.reject(error);
      });
    })();
  }
})();

module.exports = $http$1;
