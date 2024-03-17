// import axios from 'axios';
// import { create } from '../../dist/axios';
// import { create } from '../../dist/create';
import $http from '../../dist/http';


// const $axios = axios.create({});
// const $http = create({ instance: $axios });
// const $http = create({});


$http.get('https://httpbin.org/get').then(({ code, message, data, res }) => {
  console.log('🌀 $http.get(endpoint)');
  console.log(code, message, data, res);
});

$http.get('https://httpbin.org/get', { p1: 'P1' }).then(({ code, message, data, res }) => {
  console.log('🌀 $http.get(endpoint, params)');
  console.log(code, message, data, res);
});

$http.get('https://httpbin.org/get', { p1: 'P1' }, { 'x-h1': 'H1' }).then(({ code, message, data, res }) => {
  console.log('🌀 $http.get(endpoint, params, headers)');
  console.log(code, message, data, res);
});

$http.get('https://httpbin.org/get', null, { 'x-h1': 'H1' }).then(({ code, message, data, res }) => {
  console.log('🌀 $http.get(endpoint, null, headers)');
  console.log(code, message, data, res);
});

$http.get('https://httpbin.org/status/403')
  .then(({ code, message, data, res }) => {
    console.assert(false, '🌀 $http.get(endpoint) 403');
    console.log(code, message, data, res);
  })
  .catch(({ code, message, data, res }) => {
    console.log('💊 $http.get(endpoint) 403');
    console.log(code, message, data, res);
  });

$http.get('https://putsreq.com/KtI8O2ncvAkNi7mgB4pM')
  .then(({ code, message, data, res }) => {
    console.assert(false, '🌀 $http.get(endpoint) 500');
    console.log(code, message, data, res);
  })
  .catch(({ code, message, data, res }) => {
    console.log('💊 $http.get(endpoint) 500');
    console.log(code, message, data, res);
  });

$http.post('https://putsreq.com/9CeC44c0dpNt0QzYiYzE').then(({ code, message, data, res }) => {
  console.log('🌀 $http.post(endpoint) x-set-authn');
  console.log(code, message, data, res);
});

$http.post('https://httpbin.org/post', null, { d1: 'D1' }).then(({ code, message, data, res }) => {
  console.log('🌀 $http.post(endpoint, null, data)');
  console.log(code, message, data, res);
});

$http.post('https://httpbin.org/post', { p1: 'P1' }, { d1: 'D1' }).then(({ code, message, data, res }) => {
  console.log('🌀 $http.post(endpoint, params, data)');
  console.log(code, message, data, res);
});

$http.post('https://httpbin.org/post', { p1: 'P1' }, { d1: 'D1' }, { 'x-h1': 'H1' }).then(({ code, message, data, res }) => {
  console.log('🌀 $http.post(endpoint, params, data, headers)');
  console.log(code, message, data, res);
});

$http.post('https://httpbin.org/post', null, { d1: 'D1' }, { 'x-h1': 'H1' }).then(({ code, message, data, res }) => {
  console.log('$http.post(endpoint, null, params, headers)');
  console.log(code, message, data, res);
});

window.head = window.head || {};
window.head.$http = $http;
