import React, { useState } from 'react'
import { View, Image, Text, Navigator } from '@tarojs/components'

import './index.scss';
import { IActivity, IInformationDTO } from '../../../../api';
import { DEFAUL_IMAGE_URL } from '../../../../components/constants';

export interface IActivityCardProps {
  data: IInformationDTO;
}


export default function ActivityCard (props: IActivityCardProps) {
  const { data } = props;

  return (
    <View className='activity-card'  key={data.informationId}>
      <Navigator url={'/pages/activity-detail/index?activityId=' + data.informationId}>
        <Image className='thumbnial' src={data.urls?.[0] || DEFAUL_IMAGE_URL}></Image>
        <View className='mark-container'>
          <View className='text-wrapper'>
            <Text className='activity-title'>{data.informationName}</Text>
          </View>
        </View>
      </Navigator>
    </View>
  )
}
