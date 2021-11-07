import React, { useState } from 'react'
import { View, Image, Text, Navigator } from '@tarojs/components'

import './index.scss';
import { IActivity } from '../../../../api';

export interface IActivityCardProps {
  data: IActivity;
}


export default function ActivityCard (props: IActivityCardProps) {
  const { data } = props;

  return (
    <View className='activity-card'  key={data.id}>
      <Navigator url={'/pages/activity-detail/index?activityId=' + data.id}>
        <Image className='thumbnial' src={data.urls[0]}></Image>
        <View className='mark-container'>
          <View className='text-wrapper'>
            <Text className='activity-title'>{data.activityName}</Text>
          </View>
        </View>
      </Navigator>
    </View>
  )
}
