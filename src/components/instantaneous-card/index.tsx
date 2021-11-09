import React, { ReactElement, useState, useCallback, useEffect } from 'react'
import { View, Image, Text } from '@tarojs/components'
import IconFont from '../iconfont'
import Sudoku from '../sudoku'

import './index.scss';
import { LikeHeart } from '../like-heart';
import { getUser, IInformationDTO, IUser } from '../../api';
import { DEFAUL_IMAGE_URL } from '../constants';
import { createUser } from '../../pages/mock';

declare var wx: any;

export interface IInstantaneousGraphic {
  text: string;
  images: string[];
}

export interface IInstantaneousPublisher {
  avatar: string;
  nickname: string;
}

export interface IInstantaneousItem {
  id: number;

  publisher: IInstantaneousPublisher;
  publishType: 'user' | 'institution';

  graphic: IInstantaneousGraphic
  likeCount: number;
  isLiked: boolean;
  publishTime: Date | string;
}

export interface InstantaneousCardProps {
  data: IInformationDTO;
  key: string;
}

export default function InstantaneousCard(props: InstantaneousCardProps): ReactElement {
  const [count, setCount] = useState<number>(1);
  const [user, setUser] = useState<Partial<IUser>>({});
  const { data, key } = props;

  const { informationId, userId, urls, createTime, informationName, informationContent, comments } = data;

  const handleLike = useCallback(function handleLike() {
    console.log('handle click');
    // data.isLiked = !data.isLiked;
    setCount(count + 1);
  }, [count, data]);

  useEffect(() => {
    if (userId) {
      getUser(userId)
        .then((userData) => {
          console.log('用户数据 ==> %o', userData);
          setUser(userData);
        })
    }
  }, [userId])
  const shareInstantaneous = function shareInstantaneous() {
    console.log('转发瞬间');
    (wx as any).showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline'],
      success(...args) {
        wx.showToast({
          title: '转发瞬间',
        })
        console.log(args);
      },
      fail(...args) {
        console.log(args);
      },
      complete(...args) {
        console.log(args);
      }
    })
  }

  return (
    <View key={key} className='instantaneos-card'>
      <View className='i-header'>
        <Image className='avatar' mode='aspectFit' src={user.userPicUrl ?? DEFAUL_IMAGE_URL} />
        <Text className='nickname'>{user.userName ?? '未知用户'}</Text>
      </View>

      <View className='i-body'>
        <View>
          <Text className='graphic-text'>{informationContent}</Text>
        </View>
        <Sudoku images={urls ?? []} />
      </View>

      <View className='i-footer'>
        <Text className='publish-time'>{createTime}</Text>
        <View className='operation'>
          <LikeHeart infoId={String(informationId)} />
          {/* <View onClick={shareInstantaneous}>
            <IconFont name='share' />
          </View> */}
        </View>
      </View>
    </View>
  )
}
