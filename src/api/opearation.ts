
import { request } from "../utils";
import { IUser } from "./user";

export interface IActivity {
  id: string;

  creator: IUser;

  activityName: string;

  activityContent: string;

  // 图片地址
  urls?: string[];

  comments?: IComment[];

  createTime: string;
}

/**
 * 创建活动
 *
 * @export
 * @param {IActivity} activityData
 * @returns
 */
export function createActivity(activityData: IActivity) {
  return request({
    url: '/operation/activity',
    method: 'POST',
    data: activityData,
  });
}

/**
 * 查询单个活动内容
 *
 * @export
 * @param {number} activityId
 */
export function getActivityById(activityId: number) {
  return request<IInformationDTO>({
    url: `/operation/activity/${activityId}`,
    method: 'GET',
  });
}

/**
 * 活动列表查询 通过用户id
 *
 * @export
 * @param {number} userId
 */
export function getActivityByUser(userId: number) {
  return request<IInformationDTO>({
    url: `/operation/activityByUserId/${userId}`,
    method: 'GET',
  });
}

/**
 * 查询所有活动列表
 *
 * @export
 */
export function getAllActivity() {
  return request<IInformationDTO[]>({
    url: '/operation/activity/all',
    method: 'GET',
  });
}

export interface IComment {
  id: string;

  content: string;

  urls?: string[];

  createTime: string;
}

export interface IInformationDTO {
  userId: string;

  informationId: string;

  informationName: string;

  informationContent: string;

  urls: string[];

  comments?: IComment[];

  informationType: InformationTypeEnum;

  createTime: string;
}

export enum InformationTypeEnum {
  ACTIVITY = 'activity',

  INFORMATION = 'information',
}

// export interface IInformation {
//   creator: IUser;

//   activityName: string;

//   activityContent: string;

//   urls: string[];

//   comments: IComment[];

//   createTime: string;

//   informationType: InformationTypeEnum;
// }

export function createComments(comment: IInformationDTO) {
  return request({
    url: '/operation/comments',
    method: 'POST',
    data: comment,
  });
}

/**
 * 留言列表查询
 *
 * @export
 * @param {number} userId
 */
export function getCommentsByUser(userId: string) {
  return request<IComment[]>({
    url: `/operation/comments/${userId}`,
    method: "GET",
  });
}


export function getLikedInstantaneous(): Promise<IInformationDTO[]> {
  return request<IInformationDTO[]>({
    url: `/operation/queryUserLike`,
    method: 'GET',
  })
}

export interface ILikeParam {
  userId: string;
  informationId: string;
}

export function likeInstantaneous(param: ILikeParam) {
  return request<boolean>({
    url: '/operation/giveLike',
    method: 'POST',
    data: param,
  });
}

export function unlikeInstantaneous(param: ILikeParam) {
  return request<boolean>({
    url: '/operation/deleteLike',
    method: 'POST',
    data: param,
  });
}


export function getShuffling(type: string) {
  return request<IInformationDTO[]>({
    url: '/operation/shuffling',
    method: 'GET'
  })
}
