import React from 'react'
import { View, Image, Text } from '@tarojs/components'
import classnames from 'classnames'
import './avatar-card.scss'

export interface IUserInfo {
  avatar: string;
  nickname: string;
}

export interface IAvatarProps  {
  userInfo: IUserInfo;
}

export default function AvatarCard(props:IAvatarProps){
  const { userInfo } = props
  return <View className='avatar-card'>
      <Image className='user-avatar' src={userInfo.avatar} />
      <Text className='nickname'>{userInfo.nickname}</Text>
  </View>
}
