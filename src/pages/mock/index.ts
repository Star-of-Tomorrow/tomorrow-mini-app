import { DEFAUL_IMAGE_URL } from "../../components/constants";
import { IInformationDTO, InformationTypeEnum, IUser } from "../../api";

let userId = 1;
let infoId = 1;
function getInfoId() {
  return String((infoId++) + (Math.random() + 10 | 0))
}

function getUrls() {
  return Array(Math.random() * 9 + 1 | 0).fill('0').map(() =>
    "https://pic3.zhimg.com/aadd7b895_xs.jpg")
}

function getComements() {
  return Array(Math.random() * 9 + 1 | 0).fill('0').map(() =>
  ({
    id: getInfoId(),
    content: 'Taro 是一个开放式跨端跨框架解决方案',
    urls: getUrls(),
    createTime: '2021-10-10 20:00:0'
  }));
}

export function createInformationDTO(): IInformationDTO {
  return {
    userId: String(userId++),
    urls: [DEFAUL_IMAGE_URL, ...getUrls()],
    informationName: '活动标题',
    informationContent: 'Taro 是一个开放式跨端跨框架解决方案，支持使用 React/Vue/Nerv 等框架来开发 微信 / 京东 / 百度 / 支付宝 / 字节跳动 / QQ 小程序 / H5 / RN 等应用。',
    informationId: getInfoId(),
    informationType: InformationTypeEnum.ACTIVITY,
    createTime: '2021-10-10 20:00:0',
    comments: getComements(),
  }
}



export function createUser(): IUser {
  return {
    userId: '1',
    userName: '机构名称',
    userPicUrl: 'https://pic3.zhimg.com/aadd7b895_xs.jpg',
    type: 'institution',
  }
}
