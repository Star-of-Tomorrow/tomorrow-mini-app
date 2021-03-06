import React, { useEffect, useState } from "react";
import InstantaneousCard, {
  IInstantaneousItem,
} from "../../components/instantaneous-card";
import { TaroVirtualList } from 'taro-virtual-list'
import { Pagination } from "@taroify/core"
import { View } from '@tarojs/components'
import "./index.scss";


import mockData from "./mock/flow.json";

function MessagePage() {
  // 模拟list数据
  const [list, setList] = useState<IInstantaneousItem[]>([]);
  const [current, setCurrent] = useState<number>(1)

  // 设置list
  useEffect(() => {
    setList(mockData as unknown as IInstantaneousItem[]);
  }, []);
  // 渲染列表Item
  const renderFunc = (
    item: IInstantaneousItem,
    index: number,
    pageIndex: number
  ) => {
    return <InstantaneousCard key={String(item.id)} data={item} />;
  };
  return (
    <View className='MessagePage page'>
      {/* TODO: 分页 */}
      <TaroVirtualList
        list={list}
        segmentNum={25}
        onRender={renderFunc}
        // onBottom={handleBottom}
        // onComplete={handleComplete}
        scrollViewProps={{
          style: {
            height: "100vh",
          },
        }}
      />
      <Pagination current={current} count={10} onChange={(page) => setCurrent(page)} />

    </View>
  );
}

export default MessagePage;
