import rnd from 'vanilla.js/random/hex';
import $http from './http';


(function webTokenByLocalStorage() {
  if (localStorage && localStorage.getItem && localStorage.setItem) {
    (function () {
      const value = localStorage.getItem('x-authn');
      if (value) {
        $http.defaults.headers.common['x-authn'] = value;
      }

      $http.interceptors.response.use(
        function (resp) {
          if (resp.headers && resp.headers['x-set-authn']) {
            const webtoken = resp.headers['x-set-authn'];
            $http.defaults.headers.common['x-authn'] = webtoken;
            localStorage.setItem('x-authn', webtoken);
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
