import { request as taroRequest } from '@tarojs/taro'

export interface IResponseWrapper<T> {
  code: 200 | 400 | number;
  data: T;
  message?: string;
}

const BASE_URL = 'http://localhost:9090/demo'
export function request<T>(options: taroRequest.Option): Promise<T> {
  return new Promise((resolve, reject) => {
    options.url = BASE_URL + options.url;
    options.fail = function failCallback(err) {
      reject(err);
    }
    options.success = function successCallback(resp: taroRequest.SuccessCallbackResult<IResponseWrapper<T>>) {
      if (resp.statusCode === 200 && resp.data?.code === 200) {
        resolve(resp.data.data);
      } else {
        reject(resp?.data?.message || '网络错误');
      }
    }
    taroRequest({
      ...options,
      dataType: 'json',
    });
  })
}
