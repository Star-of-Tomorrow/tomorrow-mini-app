import { request } from "../utils";

export interface IImageResult {
  urls: string;
}

export function uploadImage(files: File[]) {
  return request({
    url: '/file/upload',
    method: 'POST',
    dataType: 'arraybuffer',
    data: files,
  });
}
