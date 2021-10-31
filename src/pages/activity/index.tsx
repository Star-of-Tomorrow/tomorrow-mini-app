import React, { useRef, useState, useEffect } from 'react'
import { nextTick } from '@tarojs/taro';
import { View, Text } from '@tarojs/components'
import { List, Loading } from '@taroify/core';
import ActivityCard, { IActivity } from './components/activity-card'
import './index.scss'

import mockData from './mock/activities.json';

function ActivityPage(){
  const hasMoreRef = useRef(true);
  const listRef = useRef<IActivity[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    listRef.current.push(...mockData);
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
            for (let i = 0; i < 10; i++) {
              listRef.current.push(...mockData)
            }
            listRef.current = [...listRef.current]
            hasMoreRef.current = listRef.current.length < 12
            setLoading(false)
          }, 1000);
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
