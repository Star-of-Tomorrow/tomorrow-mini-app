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

      <View className='institution-manage-list'></View>
    </View>
  );
}

export default InstitutionPage;
