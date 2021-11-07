import { uploadFile } from "@tarojs/taro";

export interface IImageResult {
  urls: string;
}
const BASE_URL = 'http://localhost:9090/demo'

export function uploadImage(filepath: string): Promise<string[]> {
  return new Promise((resolve, reject) => {
    uploadFile({
      url: BASE_URL + '/file/upload',
      name: 'files',
      filePath: filepath,
      success(res) {
        const data = res.data
        resolve(data as unknown as string[]);
      },
      fail({ errMsg }) {
        reject(errMsg);
      }
    });
  })
}
