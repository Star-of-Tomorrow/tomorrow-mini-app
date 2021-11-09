import { uploadFile } from "@tarojs/taro";
import { BASE_URL, IResponseWrapper } from "../utils";

export interface IImageResult {
  urls: string;
}

export function uploadImage(filepath: string): Promise<string> {
  return new Promise((resolve, reject) => {
    uploadFile({
      url: BASE_URL + '/file/upload',
      name: 'files',
      filePath: filepath,
      success(res) {
        const data: IResponseWrapper<{urls: string[]}> = JSON.parse(res.data);
        console.log(data)
        if (data.code === 200) {

          // http://175.27.239.242:9090/demo/file/get/1636370897296.png
          const url = BASE_URL + '/file/get/' + data.data?.urls[0];
          resolve(url);
        } else {
          throw new Error('上传图片失败');
        }
      },
      fail({ errMsg }) {
        reject(errMsg);
      }
    });
  })
}
