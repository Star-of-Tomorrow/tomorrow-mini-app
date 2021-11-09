import React from 'react'
import { View, Image, Text, OpenData } from '@tarojs/components'
import classnames from 'classnames'
import './avatar-card.scss'

export interface IUserInfo {
  avatar: string;
  nickname: string;
}

export interface IAvatarProps  {
  userInfo: IUserInfo;
  onClick: () => void
}

export default function AvatarCard(props:IAvatarProps){
  const { userInfo, onClick } = props
  return <View onClick={onClick} className='avatar-card'>
    <Image className='user-avatar' src={userInfo.avatar} />
    <View className='nickname'>{userInfo.nickname}</View>

      {/* <View className='user-avatar'>
        <OpenData  type='userAvatarUrl' defaultAvatar={userInfo.avatar} />
      </View>
      <View className='nickname'>
        <OpenData type='userNickName' />
      </View> */}
  </View>
}
