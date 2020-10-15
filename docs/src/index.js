import $http from '../../dist/http';

$http.get('https://httpbin.org/get').then(({
  code, message, status, data,
}) => console.log(code, message, status, data)); // eslint-disable-line no-console

window.head = window.head || {};
window.head.$http = $http;
