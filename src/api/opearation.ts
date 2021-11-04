
import { request } from "../utils";
import { IUser } from "./user";

export interface IActivity {
  creator?: IUser;

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
  return request({
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
  return request({
    url: `/operation/activity/${userId}`,
    method: 'GET',
  });
}

/**
 * 查询所有活动列表
 *
 * @export
 */
export function getAllActivity() {
  return request({
    url: '/operation/activity/all',
    method: 'GET',
  });
}

export interface IComment {
  content: string;
}

export interface InformationDTO {
  userId: string;

  informationName: string;

  informationContent: string;

  urls: string;

  comments: IComment[];

  informationType: string;
}

export function createComments(comment: IComment) {
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
export function getCommentsByUser(userId: number) {

  return request({
    url: `/operation/comments/${userId}`,
    method: "GET",
  });
}

