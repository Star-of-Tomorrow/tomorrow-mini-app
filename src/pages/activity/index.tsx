import React, { useRef, useState, useEffect } from 'react'
import { nextTick } from '@tarojs/taro';
import { View, Text } from '@tarojs/components'
import { List, Loading } from '@taroify/core';
import ActivityCard from './components/activity-card'
import './index.scss'

import { getAllActivity, IActivity, InformationDTO, IUser } from '../../api';

let id = 1;
function createMockData(count: number = 5): InformationDTO[] {
  return Array<InformationDTO>(count).fill(1 as any).map((_val, idx) => ({
    informationId: String(idx),
    userId: '1234',
    informationContent: 'string',
    comments: [],
    informationName: '测试用活动-' + idx,
    createTime: '2021-10-23 12:00:00',
    informationType: 'activity',
    urls: ['https://up.enterdesk.com/edpic_source/ac/be/90/acbe90329993dabacbd2fa5e6078b3c7.jpg']
  }));
}

function ActivityPage(){
  const hasMoreRef = useRef(true);
  const listRef = useRef<IActivity[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {

    getAllActivity().then((data) => {
      console.log(data);
      data = createMockData(5)
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
            for (let i = 0; i < 10; i++) {
              listRef.current.push(...createMockData(5))
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
