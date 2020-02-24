"use strict";

import Vue from 'vue';
import axios from "axios";
import * as util from '@/service/error.js'
import cookie from 'js-cookie'


let config = {
  baseURL: '/api',
  timeout: 60000
};


const _axios = axios.create(config);

/**
 * [request 拦截器]
 * header添加jwt，内容为cookie里的jwt
 */
_axios.interceptors.request.use(config => {
  const csrftoken = cookie.get('csrftoken')
  csrftoken && (config.headers['X-CSRFToken'] = csrftoken)
  return config
}, error => {
  return Promise.reject(error)
})

/**
 * [response 拦截器]
 * http状态（status）：
 * 1.200:
 *   返回 {data, message, code}
 *    （1）如果code=1，不是GET请求，message有内容
 *        1.显示成功类型通知
 *        2.resolve (async-await在try代码块处理)
 *
 *    （2）如果code不为1，不是GET请求，message有内容
 *        1.显示错误类型的通知
 *        2.reject (async-await在catch代码块处理)
 *
 * 2.非200：在reject部分处理，具体方法在util.catchError
 */
_axios.interceptors.response.use(response => {
  let {
    data
  } = response
  return Promise.resolve(data)
}, (e) => {
  return util.catchError(e)
} )


Plugin.install = function(Vue) {
  Vue.axios = _axios;
  window.axios = _axios;
  Object.defineProperties(Vue.prototype, {
    axios: {
      get() {
        return _axios;
      }
    },
    $axios: {
      get() {
        return _axios;
      }
    },
  });
};

Vue.use(Plugin)

export default Plugin;
