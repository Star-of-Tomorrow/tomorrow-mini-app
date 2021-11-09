import React, { useEffect, useState } from "react";
import { View, Image, Navigator } from "@tarojs/components";
import { showToast } from "@tarojs/taro";
import { Cell } from "@taroify/core";
import IconFont from "../../components/iconfont";
import "./index.scss";
import { getCurrentUser, getInstitution, IInstitution, IUser } from "../../api";
import { DEFAUL_IMAGE_URL } from "../../components/constants";

function InstitutionPage() {
  const [institution, setInstitution] = useState<Partial<IInstitution>>({})
  useEffect(() => {
    const user = getCurrentUser()
    if (!user) {
      return showToast({ title: "请先登录", icon: 'none' });
    }
    getInstitution(user.type)
      .then((institutionInfo) => {
        setInstitution(institutionInfo)
      })
  }, []);
  return (
    <View className='institution-page page'>
      <View className='institution-info'>
        <Image
          className='institution-photo'
          src={institution.url ?? DEFAUL_IMAGE_URL}
        />
        <View className='institution-name'>{institution.institutionsName}</View>
      </View>

      <View className='institution-card'>
        <Navigator url='/pages/activity-create/index'>
          <View className='institution-card-item'>
                <IconFont name='create' size={70} />
              <View className='operate'>新建活动</View>
          </View>
        </Navigator>

        <Navigator url='/pages/my-activity/index'>
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
