/* eslint-disable no-undef */
import Vue from 'vue'
import * as axios from 'axios'
// import apiConfig from '../api.config'
const baseUrl = 'http://picker.la'
// let options = {}
// The server-side needs a full url to works
// if (process.server) {
//   options.baseURL = `http://${process.env.HOST || 'localhost'}:${process.env.PORT || 3000}`
// }

const service = axios.create({
  withCredentials: true,
  baseURL: baseUrl
})

// 拦截器
service.interceptors.request.use(config => {
  return config
}, error => {
  return Promise.reject(error)
})

service.interceptors.response.use(response => {
  return response
}, error => {
  return Promise.reject(error)
})

Vue.prototype.$http = axios
export default service
// export default axios.create(options)
