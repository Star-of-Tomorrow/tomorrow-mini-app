import { request } from "../utils";

export interface IUser {
  userId: string;

  userName: string;

  userPicUrl: string;

  type: string;
}

export function getUser(userId: string) {
  return request<IUser>({
    url: `/user/${userId}`,
    method: 'GET',
  })
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
