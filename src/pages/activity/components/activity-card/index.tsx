import React, { useState } from 'react'
import { View, Image, Text, Navigator } from '@tarojs/components'

import './index.scss';

export interface IActivity {
  thumbnail: string;
  title: string;
  activityId: number;
}

export interface IActivityCardProps {
  data: IActivity;
}


export default function ActivityCard (props: IActivityCardProps) {
  const { data } = props;

  return (
    <View className='activity-card'  key={data.activityId}>
      <Navigator url='/pages/activity-detail/index'>
        <Image className='thumbnial' src={data.thumbnail}></Image>
        <View className='mark-container'>
          <View className='text-wrapper'>
            <Text className='activity-title'>{data.title}</Text>
          </View>
        </View>
      </Navigator>
    </View>
  )
}
