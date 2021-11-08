import React, { useEffect, useState } from "react";
import { TaroVirtualList } from "taro-virtual-list";
import { View, Button } from "@tarojs/components";
import { Popup } from "@taroify/core";
import IconFont from "../../components/iconfont";
import InstantaneousCard, {
  IInstantaneousItem,
} from "../../components/instantaneous-card";

import "./index.scss";


function MessagePublishPage() {


  return (
    <View className='MessagePage page'>

      <Button className='publish-message'>
        发布留言aa
      </Button>
    </View>
  );
}

export default MessagePublishPage;
