import React, { useState, useEffect } from 'react'
import { TaroVirtualList } from 'taro-virtual-list'
import { View } from '@tarojs/components'
import InstantaneousCard from '../../components/instantaneous-card';
import { getCurrentUser, getLikedInstantaneous, IInformationDTO } from '../../api';

import './index.scss'

function MyLikePage(){
  // 模拟list数据
  const [list, setList] = useState<IInformationDTO[]>([]);

  // 设置list
  useEffect(() => {
    const user = getCurrentUser()
    getLikedInstantaneous(user.userId)
      .then(data => {
        console.log('所有瞬间 ==> %o', data);
        setList(data)

      });
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

export default MyLikePage
