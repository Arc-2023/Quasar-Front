import { Notify } from 'quasar'

import axios from 'axios'
const service = axios.create({
  baseURL: '/',
  withCredentials: true,
  timeout: 10000
})
service.interceptors.request.use(
  (config) => {
    return config
  },
  error => {
    Notify.create('错误' + error)
    return Promise.reject(error)
  }
)
service.interceptors.response.use(
  (config) => {
    const data = config.data
    if (data.code === 500 || config.status == 500) {
      Notify.create('Server500: ' + data.msg)
      return Promise.reject(config)
    } else if (data.code === 404 || config.status == 404) {
      Notify.create('Server404: ' + data.msg)
      return Promise.reject(config)
    }
    return config
  },
  error => {
    Notify.create('连接错误: ' + error)

    return Promise.reject(error)
  }
)
/*  export default ({ app }) => {
  app.config.globalProperties.$axios = axios
  app.config.globalProperties.$api = service
}  */
export default service
