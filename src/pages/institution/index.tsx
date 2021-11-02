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
          src='assets/image/user-light.png'
        />
        <View className='institution-name'>此处机构名</View>
      </View>

      <View className='institution-card'>
        <View className='institution-card-item'>
          <Navigator url='/pages/activity-create/index'>
            <Image
              className='institution-card-item-photo'
              src='assets/image/user-light.png'
            />
            <View className='operate'>新建活动</View>
          </Navigator>
        </View>

        <View className='institution-card-item'>
          <Navigator url='/pages/activity/index'>
            <Image
              className='institution-card-item-photo'
              src='../../assets/image/user-light.png'
            />
            <View className='operate'>活动列表</View>
          </Navigator>
        </View>

        <View className='institution-card-item'>
          <Navigator url='/pages/institution/index'>
            <Image
              className='institution-card-item-photo'
              src='../../assets/image/user-light.png'
            />
            <View className='operate'>管理员</View>
          </Navigator>
        </View>

        <View className='institution-card-item'>
          <Navigator url='/pages/institution/index'>
            <Image
              className='institution-card-item-photo'
              src='../../assets/image/user-light.png'
            />
            <View className='operate'>留言</View>
          </Navigator>
        </View>
      </View>
    </View>
  );
}

export default InstitutionPage;
