function getTokenFromLocalStorage() {
  const tokens = {};
  const authn = localStorage.getItem('x-authn');
  if (authn) {
    tokens['x-authn'] = authn;
  }
  return tokens;
}


function setTokenToLocalStorage(values) {
  Object.keys(values).forEach(function (key) {
    localStorage.setItem(key, values[key]);
  });
}


export default {
  gets: function getToken() {
    return getTokenFromLocalStorage();
  },

  sets: function setToken(values) {
    setTokenToLocalStorage(values);
  },
};
