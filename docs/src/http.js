import $http from '../../dist/http';

$http.get('https://httpbin.org/get').then(({
  code, message, status, data,
}) => console.log('$http.get(endpoint)', code, message, status, data));

$http.get('https://httpbin.org/get', { p1: 'P1' }).then(({
  code, message, status, data,
}) => console.log('$http.get(endpoint, query)', code, message, status, data));

$http.get('https://httpbin.org/get', { p1: 'P1' }, { headers: { 'x-h1': 'H1' } }).then(({
  code, message, status, data,
}) => console.log('$http.get(endpoint, query, options)', code, message, status, data));

$http.get('https://httpbin.org/get', null, { headers: { 'x-h1': 'H1' } }).then(({
  code, message, status, data,
}) => console.log('$http.get(endpoint, null, options)', code, message, status, data));

$http.post('https://httpbin.org/post').then(({
  code, message, status, data,
}) => console.log('$http.post(endpoint)', code, message, status, data));

$http.post('https://httpbin.org/post', { d1: 'D1' }).then(({
  code, message, status, data,
}) => console.log('$http.post(endpoint, form)', code, message, status, data));

$http.post('https://httpbin.org/post', { p1: 'P1' }, { d1: 'D1' }).then(({
  code, message, status, data,
}) => console.log('$http.post(endpoint, query, form)', code, message, status, data));

$http.post('https://httpbin.org/post', { p1: 'P1' }, { d1: 'D1' }, { headers: { 'x-h1': 'H1' } }).then(({
  code, message, status, data,
}) => console.log('$http.post(endpoint, query, form, options)', code, message, status, data));

$http.post('https://httpbin.org/post', null, { d1: 'D1' }, { headers: { 'x-h1': 'H1' } }).then(({
  code, message, status, data,
}) => console.log('$http.post(endpoint, null, form, options)', code, message, status, data));

window.head = window.head || {};
window.head.$http = $http;
