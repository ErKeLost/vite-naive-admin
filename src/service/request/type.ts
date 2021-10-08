import type { AxiosRequestConfig, AxiosResponse } from 'axios'

export interface AdnyRequestInterceptors<T = AxiosResponse> {
    requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
    requestInterceptorCatch?: (error: any) => any
    responseIntercptor?: (res: T) => T
    responseIntercptorCatch?: (error: any) => any
}

export interface AdnyRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: AdnyRequestInterceptors<T>
}