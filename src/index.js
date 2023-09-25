import rnd from 'vanilla.js/random/hex';
import $create from './http';


const $http = $create({});


(function webTokenByLocalStorage() {
  if (localStorage && localStorage.getItem && localStorage.setItem) {
    (function () {
      const initial = localStorage.getItem('x-authn');
      if (initial) {
        $http.defaults.headers.common['x-authn'] = initial;
      }

      $http.interceptors.request.use(
        function (config) {
          const authn = localStorage.getItem('x-authn');
          config.headers['x-authn'] = authn; // eslint-disable-line no-param-reassign
          return config;
        },
        function (error) {
          return Promise.reject(error);
        }); // eslint-disable-line function-paren-newline

      $http.interceptors.response.use(
        function (resp) {
          if (resp.headers && resp.headers['x-set-authn']) {
            const authn = resp.headers['x-set-authn'];
            $http.defaults.headers.common['x-authn'] = authn;
            localStorage.setItem('x-authn', authn);
          }
          return resp;
        },
        function (error) {
          return Promise.reject(error);
        }); // eslint-disable-line function-paren-newline
    }());
  }
}());


(function jaegerTracing() {
  $http.interceptors.request.use(
    function (config) {
      const traceId = rnd(16);
      const spanId = rnd(16);
      const parentSpanId = traceId;
      const flag = '01'; // TODO: sampling

      if (flag) {
        const header = 'uber-trace-id';
        config.headers[header] = `${traceId}:${spanId}:${parentSpanId}:${flag}`; // eslint-disable-line no-param-reassign
      }

      return config;
    }); // eslint-disable-line function-paren-newline
}());


export default $http;
