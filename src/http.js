import axios from 'axios';
import { onSuccess, onError } from './response';


const $http = axios.create({
});


$http.interceptors.response.use(onSuccess, onError);


// sugar
$http._get = $http.get;

$http.get = function (endpoint, query = {}) {
  return $http._get(endpoint, { params: query });
};

$http._delete = $http.delete;

$http.delete = function (endpoint, query = {}) {
  return $http._delete(endpoint, { params: query });
};


export default $http;
