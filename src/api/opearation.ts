
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
export function createActivity(instantaneousData: Partial<IInformationDTO>) {
  instantaneousData.informationType = InformationTypeEnum.ACTIVITY;
  return request({
    url: '/operation/createInformation',
    method: "POST",
    data: instantaneousData,
  });
}
/**
 * 查询单个活动内容
 *
 * @export
 * @param {number} infoId
 */
export function getActivityById(infoId: string) {
  return request<IInformationDTO>({
    url: `/operation/activity/${infoId}`,
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
export function getAllActivity(type?: InformationTypeEnum) {
  return request<IInformationDTO[]>({
    url: '/operation/information/all?type=' + type,
    method: 'GET',
  });
}

export function getAllIntantaneous() {
  return request<IInformationDTO[]>({
    url: '/operation/information/all',
    method: 'GET',
  })
}

export function getIntantaneouseByUser(userId: string) {
  return request<IInformationDTO[]>({
    url: '/operation/informationByUserId/' + userId,
    method: 'GET',
  });
}

export interface IInformationDTO {
  userId: string;

  informationId: string;

  informationName: string;

  informationContent: string;

  urls?: string[];

  comments?: IComment[];

  informationType: InformationTypeEnum;

  createTime?: string;
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

export enum CommentType {
  COMMNET = 'comment',
  PROGRESS = 'progress',
}

export interface IComment {
  id?: string;
  content: string,
  informationId: string,
  type: CommentType,
  urls: string[],
  userId: string,
  createTime?: string,
}

export function createComments(comment: IComment) {
  return request({
    url: '/operation/comments',
    method: 'POST',
    data: comment,
  });
}

export function createInstantaneous(instantaneousData: Partial<IInformationDTO>) {
  instantaneousData.informationType = InformationTypeEnum.INFORMATION;
  return request({
    url: '/operation/createInformation',
    method: "POST",
    data: instantaneousData,
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


export function getLikedInstantaneous(userId: string): Promise<IInformationDTO[]> {
  return request<IInformationDTO[]>({
    url: `/operation/queryUserLike`,
    method: 'POST',
    data: { userId },
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


export function getShuffling(type: InformationTypeEnum) {
  return request<IInformationDTO[]>({
    url: '/operation/shuffling?type=' + type,
    method: 'GET'
  })
}

export function isInstitutionUser(userId) {
  return request<boolean>({
    url: '/user/getUserInstitutions?userId=' + userId,
    method: 'GET'
  });
}
export interface IInstitution {
    createTime: string,
    id: number,
    institutionsId: string,
    institutionsName: string,
    updateTime: string
    url: string;
}
export function getInstitution(institutionId: string) {
  return request<IInstitution>({
    url: '/user/getInstitutions?institutionId=' + institutionId,
    method: 'GET',
  });
}
