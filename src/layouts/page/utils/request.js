import axios from 'axios';
import {message} from 'antd';
import store from '@/layouts/store';

// export const baseUrl = `//47.107.230.235:3001/api/`;
export const baseUrl = `//localhost:3001/api/`;
console.log(process.env)
// create an axios instance
const api = axios.create({
  baseURL: baseUrl, // url = base url + request url
  //timeout: 50000, // request timeout
});

// request interceptor
api.interceptors.request.use(
  (config) => {
    if (store.getState().user.token) {
      config.headers['Authorization'] = store.getState().user.token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// response interceptor
api.interceptors.response.use(
  response => {
    const {code, errMsg, result} = response.data;
    if (errMsg) {
      if (code == 4001) {
        store.dispatch.user.updateUser({});
      }
      return Promise.reject(new Error(errMsg || 'Error'));
    } else if (result) {
      return Promise.resolve(result);
    }
  },
  (error) => {
    return Promise.reject(error);
  },
);

export const request = (url, data) => {
  return api({
    method: 'post',
    url,
    data,
  }).then(res => {
    return res;
  }, error => {
    message.error(error.message);
  });
};

export default api;
