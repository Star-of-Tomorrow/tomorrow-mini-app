import React from "react";
import { View, Image, Navigator } from "@tarojs/components";
import { Cell } from "@taroify/core";
import IconFont from "../../components/iconfont";
import "./index.scss";

function InstitutionPage() {
  return (
    <View className='institution-page page'>
      <View className='institution-info'>
        <Image
          className='institution-photo'
          src='https://pic3.zhimg.com/aadd7b895_xs.jpg'
        />
        <View className='institution-name'>此处机构名</View>
      </View>

      <View className='institution-card'>
        <Navigator url='/pages/activity-create/index'>
          <View className='institution-card-item'>
                <IconFont name='create' size={70} />
              <View className='operate'>新建活动</View>
          </View>
        </Navigator>

        <Navigator url='/pages/activity/index'>
          <View className='institution-card-item'>
            <IconFont name='list' size={70} />
            <View className='operate'>活动列表</View>
          </View>
        </Navigator>

        <Navigator url='/pages/institution-manage/index'>
          <View className='institution-card-item'>
            <IconFont name='admin' size={70} />
            <View className='operate'>管理员</View>
          </View>
        </Navigator>

        <Navigator url='/pages/activity-detail-message/index'>
          <View className='institution-card-item'>
            <IconFont name='comments' size={70} />
            <View className='operate'>留言</View>
          </View>
        </Navigator>
      </View>
    </View>
  );
}

export default InstitutionPage;
