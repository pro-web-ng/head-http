export default function webTokenByLocalStorage($axios) {
  if (localStorage && localStorage.getItem && localStorage.setItem) {
    const initial = localStorage.getItem('x-authn');
    if (initial) {
      $axios.defaults.headers.common['x-authn'] = initial; // eslint-disable-line no-param-reassign
    }

    $axios.interceptors.request.use(
      (config) => {
        // console.log('interceptors.request.xauth.onFullfilled');
        const authn = localStorage.getItem('x-authn');
        config.headers.set('x-authn', authn);
        return config;
      },
      (error) => { // eslint-disable-line arrow-body-style
        return Promise.reject(error);
      }); // eslint-disable-line function-paren-newline

    $axios.interceptors.response.use(
      (rest) => {
        // console.log('interceptors.response.xauth.onFullfilled');
        if (rest.res.headers['x-set-authn']) {
          const authn = rest.res.headers['x-set-authn'];
          $axios.defaults.headers.common['x-authn'] = authn; // eslint-disable-line no-param-reassign
          localStorage.setItem('x-authn', authn);
        }
        return Promise.resolve(rest);
      },
      (error) => { // eslint-disable-line arrow-body-style
        return Promise.reject(error);
      }); // eslint-disable-line function-paren-newline
  }
}
