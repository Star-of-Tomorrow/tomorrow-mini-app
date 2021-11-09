import React, { Component } from 'react'

import { getCurrentInstance, navigateTo, showToast } from '@tarojs/taro';
import { View, Text, Image, Navigator } from '@tarojs/components'
import { Steps, Loading } from "@taroify/core"
import Sudoku from '../../components/sudoku'
import IconFont from '../../components/iconfont';
// import InstantaneousCard, { IInstantaneousItem } from '../../components/instantaneous-card';
import { getActivityById, getUser, IUser, IInformationDTO, InformationTypeEnum, IComment, getCommentsByUser, CommentType } from '../../api';

import './index.scss'

const defaultUrl = 'https://pic3.zhimg.com/aadd7b895_xs.jpg';


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
        let data = await getActivityById(activityId);
        console.log(data);
        // data = createData();
        let comments = data.comments?.filter((comment) => comment.type === CommentType.COMMNET);
        data.comments = data.comments?.filter((comment) => comment.type == CommentType.PROGRESS);
        this.setState({ activity: data });
        let user = await getUser(data.userId);
        if (!data.userId) {
          return showToast({ title: '获取活动失败', icon: 'none' });
        }
        // user = createUser();
        this.setState({ user })
        // comments = createComment();
        console.log(data, comments);
        this.setState({ comments })
      } else {
        showToast({
          title: '页面错误',
          icon: 'none',
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
                <Steps.Step icon={<IconFont name={idx === (activity?.comments?.length ?? 0) - 1 ? 'dot-end' : 'dot'} />} key={comment.informationId}>
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
          {comments?.map((comment: IComment, idx) => (
            <View key={idx}>
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
        <View className="create-comment" onClick={() => {
            navigateTo({
              url: '/pages/create-comment/index?infoId=' + activity?.informationId,
              fail() {
                showToast({ title: '跳转失败', icon: 'none' });
              },
            });
          }}
        >

            <IconFont name='pen' size={50} />

        </View>
        <IconFont name='like-o' size={50} />
        {/* <IconFont name='share' size={50} /> */}
      </View>
    </View>
  );
}
}

export default ActivityDetail
