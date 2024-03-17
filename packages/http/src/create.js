import axios from 'axios';
import $ from '../../axios/src/index';
import { onFullfilled, onRejected } from './response';
import xauth from './xauth';
import xtrace from './xtrace';


function $create() {
  const $axios = axios.create({
    headers: { 'X-Requested-With': '@head/http@0.7.0' },
  });

  const $http = $.create({ instance: $axios });

  $axios.interceptors.response.use(onFullfilled, onRejected);

  xtrace($axios);

  xauth($axios);

  // https://github.com/axios/axios/issues/1663#issuecomment-504497517
  $axios.interceptors.request.handlers.reverse();

  return $http;
}


export default { create: $create };
