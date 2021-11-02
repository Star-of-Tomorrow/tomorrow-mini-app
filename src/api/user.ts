import { request } from "../utils";

export interface IUser {
  userId: string;

  userName: string;

  userPicUrl: string;

  type: string;
}

export function getUser(userId: number) {
  return request({
    url: `/user/${userId}`,
    method: 'GET',
  })
}
