import { Notify } from 'quasar'

import axios from 'axios'

const service = axios.create({
  baseURL: '/',
  withCredentials: true,
  timeout: 15000
})

async function sch () {
  let con = 0
  const queue = []
  return async (a) => {
    con >= 10 && await new Promise((resolve) => {
      queue.push(resolve)
    })
    con += 1
    const res = await a()
    queue > 0 && queue.shift()()
    con -= 1
    return res
  }
}

const ff = sch()

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
