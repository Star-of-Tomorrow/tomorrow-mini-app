import { getStorageSync, login, setStorageSync, showToast } from "@tarojs/taro";
import { request } from "../utils";

export interface IUser {
  institutionsName: null

  openId: string;

  unionId: string;

  updateTime: string;

  userId: string;

  userName: string;

  userPicUrl: string;

  type: string;
}

const userCache: Map<string, IUser> = new Map();
export function getUser(userId: string) {
  if (userCache.has(userId)) {
    return Promise.resolve(userCache.get(userId)!);
  }
  return request<IUser>({
    url: `/user/${userId}`,
    method: 'GET',
  }).then(data => {
    userCache.set(String(userId), data);
    return data;
  });
}

export function isAdmin(infoId: string, userId: string) {
  return request({
    url: `/operation/PermissionVerify?informationId=${infoId}&userId=${userId}`,
    method: "GET",
  })
}

export function updateUserInfo(user: IUser) {
  return request({
    url: '/user/userInformation',
    method: "POST",
    data: user,
  });
}


export interface WxUserInfo {
  avatarUrl: string;
  city: string;
  country: string;
  gender: number,
  nickName: string;
  language: string;
  province: string;
}

export function wxLogin(userInfo: WxUserInfo): Promise<IUser> {
  return new Promise((resolve, reject) => {
    login({
      success: function (res) {
        if (res.code) {
          //发起网络请求
            request<IUser>({
              url: '/user/wx/login?code=' + res.code,
              method: 'POST',
            })
              .then((data) => {
                const user = {
                  ...data,
                  userName: userInfo.nickName,
                  userPicUrl: userInfo.avatarUrl,
                };
                updateUserInfo(user);
                showToast({ title: '登录成功' });
                resolve(user);
              })
              .catch(err => {
                showToast({ title: '登录失败', icon: 'none' });
                console.error(err);
                reject("登录失败");
              });
        } else {
          showToast({ title: '登录失败', icon: 'none' });
          reject("登录失败");
        }
      },
      fail({ errMsg }) {
        showToast({
          title: errMsg || '登录失败',
          icon: 'none'
        });
        reject("登录失败");
      }
    });
  })
}


export function setCurrentUser(user: IUser) {
  console.log('set current user ==>', user);
  setStorageSync('local.user', user);
}

export function getCurrentUser(): IUser {
  console.log('get current user ==>', getStorageSync('local.user'));
  return getStorageSync('local.user');
}
