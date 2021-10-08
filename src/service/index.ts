import AdnyRequest from './request'
import { BASE_URL, BASE_TIMER_OUT } from './request/config'
const request = new AdnyRequest({
  baseURL: BASE_URL,
  timeout: BASE_TIMER_OUT,
  interceptors: {
    requestInterceptor: (config) => {
      // console.log('请求成功的拦截')
      const token = ''
      if (token) {
        config.headers!.Authorization = `Bearer ${token}`
      }
      return config
    },
    requestInterceptorCatch: (err) => {
      // console.log('请求失败的拦截')
      return err
    },
    responseIntercptor: (config) => {
      // console.log('响应成功的拦截')
      return config
    },
    responseIntercptorCatch: (err) => {
      // console.log('响应失败的拦截')
      return err
    }
  }
})

export default request
