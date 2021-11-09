import React, { useState } from 'react'
import { View } from '@tarojs/components'
import { getApp, showToast } from '@tarojs/taro'

import IconFont from '../iconfont'
import { getCurrentUser, likeInstantaneous, unlikeInstantaneous } from '../../api'

import './index.scss'

export interface LikeHeartProps  {
  infoId: string;
}

function LikeHeart(props:LikeHeartProps){
  const [isLiked, setisLiked] = useState(false)
  const { infoId } = props
  async function handleLike() {
    console.log('调用瞬间');
    const user = getCurrentUser();
    if (!user?.userId) {
      return showToast({ title: "请先登录", icon: 'none' });
    }
    if (isLiked) {
      setisLiked(false);
      await unlikeInstantaneous({userId: user.userId, informationId: infoId});
    } else {
      setisLiked(true);
      await likeInstantaneous({ userId: user.userId, informationId: infoId });
    }
  }

  return <View className='like-heart-comp' onClick={handleLike} >
    <IconFont name={isLiked ? 'like' : 'like-o'} />
  </View>
}
export { LikeHeart }
