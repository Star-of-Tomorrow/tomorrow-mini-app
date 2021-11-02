import React, { ReactElement, useState, useCallback } from 'react'
import { View, Image, Text } from '@tarojs/components'
import IconFont from '../iconfont'
import Sudoku from '../sudoku'

import './index.scss';

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
  data: IInstantaneousItem;
  key: string;
}

export default function InstantaneousCard(props: InstantaneousCardProps): ReactElement {
  const [count, setCount] = useState<number>(1);
  const { data, key } = props;

  const { id, publisher, graphic, publishTime, isLiked, likeCount } = data;

  const handleLike = useCallback(function handleLike() {
    console.log('handle click');
    data.isLiked = !data.isLiked;
    setCount(count + 1);
  }, [count, data]);


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
        <Image className='avatar' src={publisher.avatar} />
        <Text className='nickname'>{publisher.nickname}</Text>
      </View>

      <View className='i-body'>
        <View>
          <Text className='graphic-text'>{graphic.text}</Text>
        </View>
        <Sudoku images={graphic.images} />
      </View>

      <View className='i-footer'>
        <Text className='publish-time'>{publishTime}</Text>
        <View className='operation'>
          <View onClick={handleLike} >
            <IconFont name={isLiked ? 'like' : 'like-o'} />
          </View>
          <View onClick={shareInstantaneous}>
            <IconFont name='share' />
          </View>
        </View>
      </View>
    </View>
  )
}
