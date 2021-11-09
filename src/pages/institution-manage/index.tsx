import React, { useEffect, useState } from "react";
import { View, Image, Navigator } from "@tarojs/components";
import { Button, List } from "@taroify/core";
import IconFont from "../../components/iconfont";
import "./index.scss";
import { getCurrentUser, getInstitution, IInstitution } from "../../api";
import { showToast } from "@tarojs/taro";
import { DEFAUL_IMAGE_URL } from "../../components/constants";

function InstitutionPage() {
  const [managerInfo, setManagerInfo] = useState<string[]>([]);
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
  // 获取管理员信息
  useEffect(() => {
    // TODO
    setManagerInfo(["aa", "bb"]);
  }, []);

  const cancelPermission = (id?: string) => {
    console.log("取消权限", id);
    setManagerInfo(managerInfo.filter(name => name !== id));
  };

  const addManage = () => {
    console.log(11, "addManage");
  };
  return (
    <View className='institution-page page'>
      <View className='institution-info'>
        <Image
          className='institution-photo'
          src={institution.url ?? DEFAUL_IMAGE_URL}
        />
        <View className='institution-name'>{institution.institutionsName}</View>
      </View>

      <View className='institution-manage-list'>
        <View className='list-title'>
          <View className='title'>管理员列表</View>
          {/* TODO: 添加管理员 */}
          <View className='icon' onClick={addManage}>
            <IconFont name='admin' size={60} />
          </View>
        </View>
        <List className='list-con'>
          {managerInfo.map((item, index) => {
            return (
              <View className='list-item' key={index}>
                <View className='icon'>
                  <IconFont name='admin' size={30} />
                </View>
                <View className='name'>{item}</View>
                <Button
                  className='btn'
                  plain={false}
                  size='mini'
                  value={item}
                  onClick={cancelPermission} // TODO：取消
                  hoverStyle='none'
                >
                  收回权限
                </Button>
              </View>
            );
          })}
        </List>
      </View>
    </View>
  );
}

export default InstitutionPage;
