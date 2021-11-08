import React, { useEffect, useState } from "react";
import { TaroVirtualList } from "taro-virtual-list";
import { View, Button, Navigator } from "@tarojs/components";
import InstantaneousCard, {
  IInstantaneousItem,
} from "../../components/instantaneous-card";

import "./index.scss";

import mockData from "./mock/flow.json";

function MessagePage() {
  // 模拟list数据
  const [list, setList] = useState<IInstantaneousItem[]>([]);

  // 设置list
  useEffect(() => {
    // 获取留言
    // 通过分页形式，设置留言数
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

      <Navigator url='/pages/activity-detail-message-publish/index'>
        <Button className='publish-message'>发布留言</Button>
      </Navigator>
    </View>
  );
}

export default MessagePage;
