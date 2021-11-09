import React, { useState, useEffect } from 'react'
import { TaroVirtualList } from 'taro-virtual-list'
import { View } from '@tarojs/components'
import InstantaneousCard from '../../components/instantaneous-card';
import { Carousel } from '../../components/carousel';
import { getAllIntantaneous, IInformationDTO } from '../../api';
import { PublishBall } from '../../components/publish-ball';

import './index.scss'

function InstantaneousPage(){
  // 模拟list数据
  const [list, setList] = useState<IInformationDTO[]>([]);

  // 设置list
    useEffect(() => {
      getAllIntantaneous()
        .then(data => {
          console.log('所有瞬间 ==> %o', data);
          setList(data)
          // setList([createInformationDTO(), createInformationDTO(), createInformationDTO()]);
        })
    // setList(mockData as unknown as IInstantaneousItem[])
  }, [])

  // 渲染列表Item
  const renderFunc = (item: IInformationDTO, index: number, pageIndex: number) => {
    return <InstantaneousCard key={String(item.informationId)} data={item} />;
  }

  const handleBottom = () => {
    console.log('触底了')
  }
  const handleComplete = () => {
    console.log('加载完成')
  }

  return (
    <View>
      <Carousel />
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
      <PublishBall />
    </View>
  )
}

export default InstantaneousPage
