import React, { useState, useEffect } from 'react'
import { Swiper } from "@taroify/core"
import { TaroVirtualList } from 'taro-virtual-list'
import { View } from '@tarojs/components'
import InstantaneousCard, { IInstantaneousItem } from '../../components/instantaneous-card';

import './index.scss'

import mockData from './mock/flow.json';

function InstantaneousPage(){
  // 模拟list数据
  const [list, setList] = useState<IInstantaneousItem[]>([])

  // 设置list
  useEffect(() => {
    setList(mockData as unknown as IInstantaneousItem[])
  }, [])

  // 渲染列表Item
  const renderFunc = (item: IInstantaneousItem, index: number, pageIndex: number) => {
    return <InstantaneousCard key={String(item.id)} data={item} />;
  }

  const handleBottom = () => {
    console.log('触底了')
  }
  const handleComplete = () => {
    console.log('加载完成')
  }

  return (
    <View>
      <Swiper className='basic-swiper' autoplay={1000}>
        <Swiper.Item>1</Swiper.Item>
        <Swiper.Item>2</Swiper.Item>
        <Swiper.Item>3</Swiper.Item>
        <Swiper.Item>4</Swiper.Item>
      </Swiper>
      <TaroVirtualList
        list={list}
        segmentNum={25}
        onRender={renderFunc}
        onBottom={handleBottom}
        onComplete={handleComplete}
        scrollViewProps={{
          style: {
            height: '100vh',
          },
        }}
      />
    </View>
  )
}

export default InstantaneousPage
