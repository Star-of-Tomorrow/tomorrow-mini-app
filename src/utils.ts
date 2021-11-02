import { request as taroRequest } from '@tarojs/taro'

const BASE_URL = 'http://localhost:9090'
export function request<T>(options: taroRequest.Option): Promise<T> {
  return new Promise((resolve, reject) => {
    options.url = BASE_URL + options.url;
    options.fail = function failCallback(err) {
      reject(err);
    }
    options.success = function successCallback(resp: taroRequest.SuccessCallbackResult<T>) {
      if (resp.statusCode === 200) {
        resolve(resp.data);
      } else {
        reject(resp.data || '网络错误');
      }
    }
    taroRequest({
      ...options,
      dataType: 'json',
    });
  })
}
