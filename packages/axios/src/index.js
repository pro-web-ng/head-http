import { merge } from './lib/utils';


function Http({ instance }) { // const $axios = axios.create({});
  this.$axios = instance;

  this.$axios.interceptors.response.use(
    ({ config, request, status, statusText, headers, data }) => { // eslint-disable-line no-unused-vars
      const res = { status, statusText, headers: headers.toJSON() };
      if (data?.data) {
        const rest = { code: 0, message: 'ok', res, ...data };
        return Promise.resolve(rest);
      } else {
        const rest = { code: 0, message: 'ok', res, data: data || {} };
        return Promise.resolve(rest);
      }
    },
    (err) => { // eslint-disable-line arrow-body-style
      // console.log('$axios.intercepters.response.rejected', err); // eslint-disable-line no-console
      if (err && err.name === 'AxiosError') {
        const { name, config, request, /* response, */ code, message } = err; // eslint-disable-line no-unused-vars
        const { status, statusText, headers, data } = err.response;
        const res = { status, statusText, headers: headers.toJSON(), name, code, message };
        if (data?.data) {
          const rest = { code: -1, message: 'AxiosError', res, ...data };
          return Promise.reject(rest);
        } else {
          const rest = { code: -1, message: 'AxiosError', res, data: data || {} };
          return Promise.reject(rest);
        }
      } else {
        return Promise.reject(err);
      }
    }); // eslint-disable-line function-paren-newline
}


Http.prototype.get = function (endpoint, params = {}, headers = {}, options = {}) {
  return this.$axios.get(endpoint, merge(options, { params, headers }));
};


Http.prototype.post = function (endpoint, params = {}, data = {}, headers = {}, options = {}) {
  return this.$axios.post(endpoint, data, merge(options, { params, headers }));
};


Http.prototype.put = function (endpoint, params = {}, data = {}, headers = {}, options = {}) {
  return this.$axios.put(endpoint, data, merge(options, { params, headers }));
};


Http.prototype.delete = function (endpoint, params = {}, headers = {}, options = {}) {
  return this.$axios.delete(endpoint, merge(options, { params, headers }));
};


function create($axios) { // eslint-disable-line import/prefer-default-export
  const $http = new Http($axios);
  return $http;
}


export default { create };
