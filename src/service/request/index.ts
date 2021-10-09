import axios from 'axios'

import type { AdnyRequestInterceptors, AdnyRequestConfig } from './type'

import type { AxiosInstance } from 'axios'

class AdnyRequest {
  instance: AxiosInstance
  interceptors?: AdnyRequestInterceptors
  constructor(config: AdnyRequestConfig) {
    this.instance = axios.create(config)
    this.interceptors = config.interceptors

    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    )
    this.instance.interceptors.response.use(
      this.interceptors?.responseIntercptor,
      this.interceptors?.responseIntercptorCatch
    )
  }

  request<T = any>(config: AdnyRequestConfig): Promise<T> {
    return new Promise((resolve, reject) => {
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config)
      }
      this.instance
        .request<any, any>(config)
        .then((res) => {
          if (config.interceptors?.responseIntercptor) {
          }
          resolve(res.data)
        })
        .catch((err) => {
          reject(err)
          return err
        })
    })
  }

  get<T = any>(config: AdnyRequestConfig): Promise<T> {
    return this.request({ ...config, method: 'GET' })
  }

  post<T = any>(config: AdnyRequestConfig): Promise<T> {
    return this.request({ ...config, method: 'POST' })
  }

  delete<T = any>(config: AdnyRequestConfig): Promise<T> {
    return this.request({ ...config, method: 'DELETE' })
  }

  patch<T = any>(config: AdnyRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'PATCH' })
  }
}

export default AdnyRequest
