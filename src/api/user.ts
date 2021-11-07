import { request } from "../utils";

export interface IUser {
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

export function isAdmin() {
  request({
    url: '/operation/PermissionVerify',
    method: "POST",
  })
}



export function wxLogin() {
  return request({
    url: '/user/wx/login',
    method: 'POST',
  })
}
