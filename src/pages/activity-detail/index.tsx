import React, { Component } from 'react'

import { getCurrentInstance, showToast } from '@tarojs/taro';
import { View, Text, Image } from '@tarojs/components'
import { Steps, Loading } from "@taroify/core"
import Sudoku from '../../components/sudoku'
import IconFont from '../../components/iconfont';
// import InstantaneousCard, { IInstantaneousItem } from '../../components/instantaneous-card';
import { getActivityById, getUser, IUser, IInformationDTO, InformationTypeEnum, IComment, getCommentsByUser } from '../../api';

import './index.scss'

const defaultUrl = 'https://pic3.zhimg.com/aadd7b895_xs.jpg';

function createData(): IInformationDTO {
  return {
    userId: '1',
    urls: [
      "https://pic3.zhimg.com/aadd7b895_xs.jpg",
      "https://pic3.zhimg.com/aadd7b895_xs.jpg",
      "https://pic3.zhimg.com/aadd7b895_xs.jpg",
      "https://pic3.zhimg.com/aadd7b895_xs.jpg",
    ],
    informationName: '活动标题',
    informationContent: 'Taro 是一个开放式跨端跨框架解决方案，支持使用 React/Vue/Nerv 等框架来开发 微信 / 京东 / 百度 / 支付宝 / 字节跳动 / QQ 小程序 / H5 / RN 等应用。',
    informationId: '1',
    informationType: InformationTypeEnum.ACTIVITY,
    createTime: '2021-10-10 20:00:0',
    comments: [
      { id: '1',
      content: 'Taro 是一个开放式跨端跨框架解决方案',
      urls: ['https://pic3.zhimg.com/aadd7b895_xs.jpg'],
      createTime: '2021-10-10 20:00:0' },
      { id: '2', content: 'Taro 是一个开放式跨端跨框架解决方案', urls: [],createTime: '2021-10-10 20:00:0' },
      { id: '2', content: 'Taro 是一个开放式跨端跨框架解决方案', urls: [],createTime: '2021-10-10 20:00:0' }
    ],
  }
}


function createComment(): IComment[] {
  return [
    { id: '1', content: 'Taro 是一个开放式跨端跨框架解决方案', urls: ["https://pic3.zhimg.com/aadd7b895_xs.jpg"], createTime: '2021-10-10 20:00:0' },
    { id: '1', content: 'Taro 是一个开放式跨端跨框架解决方案', urls: ["https://pic3.zhimg.com/aadd7b895_xs.jpg"], createTime: '2021-10-10 20:00:0' },
  ]
}

export interface IActivityDetailState {
  activity?: IInformationDTO;

  activityId?: string;

  user?: IUser;

  comments?: IComment[];
}
class ActivityDetail extends Component<any, IActivityDetailState> {

  state: IActivityDetailState = {};

  $instance = getCurrentInstance()

  componentDidMount() {
    // 获取路由参数
    (async () => {
      const activityId = this?.$instance?.router?.params?.activityId;
      this.setState({ activityId });
      if (activityId) {
        let data = await getActivityById(Number(activityId))
        console.log(data);
        data = createData();
        this.setState({ activity: data });
        let user = await getUser(data.userId);
        user = createUser();
        this.setState({ user })
        let comments = await getCommentsByUser('1');
        comments = createComment();
        this.setState({ comments })
      } else {
        showToast({
          title: '页面错误',
          duration: 2000,
        });
      }

    })();
  }

  render() {

    const { activity, user, activityId, comments } = this.state;

  return (
    <View className='activity-defailt-page page'>
      {activityId ?
        <View className='activity-detail' >
          <View className='activity-institution'>
            <Image className='institution-avatar' src={user?.userPicUrl || defaultUrl} />
            <Text className='institution-name'>{user?.userName}</Text>
          </View>
          <View className='activity-body'>
            <Steps direction='vertical' value={(activity?.comments?.length ?? 0)}>
              <Steps.Step icon={<IconFont name='localhost' />} key={activity?.informationId}>
                <View className='step-container'>
                  <View className='activity-text-container'>
                    <Text className='activity-item-text'>{activity?.informationContent}</Text>
                  </View>
                  <Sudoku images={activity?.urls || []} />
                </View>
                <Text className='activity-date'>{activity?.createTime}</Text>
              </Steps.Step>
              {activity && activity?.comments?.map((comment, idx) => (
                <Steps.Step icon={<IconFont name={idx === (activity?.comments?.length ?? 0) - 1 ? 'dot-end' : 'dot'} />} key={comment.id}>
                  <View className='step-container'>
                    <View className='activity-text-container'>
                      <Text className='activity-item-text'>{comment.content}</Text>
                    </View>
                    <Sudoku images={comment.urls || []} />
                  </View>
                  <Text className='activity-date'>{comment.createTime}</Text>
                </Steps.Step>
              ))}
            </Steps>
          </View>
        </View>
        : <Loading className='loading' />
    }

    {activityId &&
      <View className='comments-area'>
        <View className='comments-header'>
          <Text className='commments-header-text'>留言区</Text>
        </View>
        <View className='comments-body'>
          {comments?.map((comment: IComment) => (
            <View key={comment.id}>
              <View className='step-container'>
                <View className='activity-text-container'>
                  <Text className='activity-item-text'>{comment.content}</Text>
                </View>
                <Sudoku images={comment.urls || []} />
              </View>
              <Text className='activity-date'>{comment.createTime}</Text>
            </View>
          ))}
        </View>
      </View>
    }

      <View className='comments-operate'>
        <IconFont name='pen' size={50} />
        <IconFont name='like-o' size={50} />
        <IconFont name='share' size={50} />
      </View>
    </View>
  );
}
}

export default ActivityDetail
