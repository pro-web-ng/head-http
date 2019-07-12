import $http from './http';


(function webTokenByInput() {
  if (document && document.querySelector) {
    (function () {
      const storage = document.querySelector('#_webtoken');
      if (storage) {
        if (storage.value) {
          $http.defaults.headers.common['Authorization'] = 'Bearer ' + storage.value; // eslint-disable-line dot-notation
        }

        $http.interceptors.response.use(
          function (resp) { // eslint-disable-line prefer-arrow-callback
            if (resp.headers && resp.headers['x-web-token']) {
              const webtoken = resp.headers['x-web-token'];
              $http.defaults.headers.common['Authorization'] = 'Bearer ' + webtoken; // eslint-disable-line dot-notation
              storage.value = webtoken;
            }
            return resp;
          },
          function (error) { // eslint-disable-line prefer-arrow-callback
            return Promise.reject(error);
          });
      }
    }());

    (function () {
      const storage = document.querySelector('#_webtracking');
      if (storage) {
        if (storage.value) {
          $http.defaults.headers.common['X-Tk'] = storage.value;
        }

        $http.interceptors.response.use(
          function (resp) { // eslint-disable-line prefer-arrow-callback
            if (resp.headers && resp.headers['x-web-tracking']) {
              const webtracking = resp.headers['x-web-tracking'];
              $http.defaults.headers.common['X-Tk'] = webtracking;
              storage.value = webtracking;
            }
            return resp;
          },
          function (error) { // eslint-disable-line prefer-arrow-callback
            return Promise.reject(error);
          });
      }
    }());
  }
}());


(function webTokenByLocalStorage() {
  if (localStorage && localStorage.getItem && localStorage.setItem) {
    (function () {
      const value = localStorage.getItem('#_webtoken');
      if (value) {
        $http.defaults.headers.common['Authorization'] = 'Bearer ' + value; // eslint-disable-line dot-notation
      }

      $http.interceptors.response.use(
        function (resp) { // eslint-disable-line prefer-arrow-callback
          if (resp.headers && resp.headers['x-web-token']) {
            const webtoken = resp.headers['x-web-token'];
            $http.defaults.headers.common['Authorization'] = 'Bearer ' + webtoken; // eslint-disable-line dot-notation
            localStorage.setItem('#_webtoken', webtoken);
          }
          return resp;
        },
        function (error) { // eslint-disable-line prefer-arrow-callback
          return Promise.reject(error);
        });
    }());

    (function () {
      const value = localStorage.getItem('#_webtracking');
      if (value) {
        $http.defaults.headers.common['X-Tk'] = value;
      }

      $http.interceptors.response.use(
        function (resp) { // eslint-disable-line prefer-arrow-callback
          if (resp.headers && resp.headers['x-web-tracking']) {
            const webtracking = resp.headers['x-web-tracking'];
            $http.defaults.headers.common['X-Tk'] = webtracking;
            localStorage.setItem('#_webtracking', webtracking);
          }
          return resp;
        },
        function (error) { // eslint-disable-line prefer-arrow-callback
          return Promise.reject(error);
        });
    }());
  }
}());


export default $http;
