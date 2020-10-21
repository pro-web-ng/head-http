import parseUri from 'vanilla.js/uri/parseUri';
import { forEach, merge } from './axios/lib/utils';
import $http from './index';

$http.defaults.proxy = {
  // proto: 'http',
  host: '127.0.0.1',
  port: 57386,
};

(function x() {
  $http.interceptors.request.use(
    function (config) {
      const { protocol, host, path: pathname, queryKey: query } = parseUri(config.url); // eslint-disable-line object-curly-newline
      config.headers['x-forwarded-proto'] = protocol; // eslint-disable-line no-param-reassign
      config.headers['x-forwarded-host'] = host; // eslint-disable-line no-param-reassign
      config.url = `http://${config.proxy.host}:${config.proxy.port}${pathname}`; // eslint-disable-line no-param-reassign
      console.log(config, query); // eslint-disable-line no-console
      return config;
    }); // eslint-disable-line function-paren-newline
}());


function conf(proxy) {
  const { host, port } = parseUri(proxy); // eslint-disable-line object-curly-newline
  const config = { proxy: { host, port } };
  const $ = {};
  forEach(['get', 'delete'], function (method) {
    $[method] = function (endpoint, query = {}, options = {}) {
      $http[method](endpoint, query, merge(options, config));
    };
  });
  forEach(['post', 'put'], function (method) {
    $[method] = function (...args) {
      const [endpoint, , , options] = args;
      let [, query, data] = args;
      if (!options) {
        if (!data) {
          data = query;
          query = {};
        }
      }
      $http[method](endpoint, query, data, merge(options, config));
    };
  });
  return $;
}

forEach(['get', 'post', 'put', 'delete'], function (method) {
  conf[method] = $http[method];
});


conf.$http = $http;


export default conf;
