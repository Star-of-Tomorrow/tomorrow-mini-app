import React, { useRef, useState, useEffect } from 'react'
import { nextTick } from '@tarojs/taro';
import { View, Text } from '@tarojs/components'
import { List, Loading } from '@taroify/core';
import ActivityCard from './components/activity-card'
import './index.scss'

import { getAllActivity, IActivity, IInformationDTO, InformationTypeEnum, IUser } from '../../api';

function ActivityPage(){
  const hasMoreRef = useRef(true);
  const listRef = useRef<IInformationDTO[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getAllActivity(InformationTypeEnum.ACTIVITY).then((data) => {
      console.log(data);
      listRef.current.push(...data);
    });
  }, [])
  return (
    <List
      className='activity-page'
      loading={loading}
      hasMore={hasMoreRef.current}
      onLoad={() => {
        nextTick(() => {
          setLoading(true)
          setTimeout(() => {
            getAllActivity(InformationTypeEnum.ACTIVITY).then((data) => {
              console.log(data);
              // listRef.current.push(...data);
              listRef.current = [...listRef.current]
              hasMoreRef.current = false;
              setLoading(false)
            });
          }, 100);
        })
      }}
    >
      {listRef.current.map((item) => (
        <ActivityCard data={item} />
      ))}
      <List.Placeholder style='height: 20px'>
        {loading && <Loading><Text className='more-placeholder'>加载中...</Text></Loading>}
        {!hasMoreRef.current && <Text className='more-placeholder'>没有更多了</Text>}
      </List.Placeholder>
    </List>
  )
}

export default ActivityPage
