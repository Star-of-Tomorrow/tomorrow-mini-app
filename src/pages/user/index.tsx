import React, { useCallback, useEffect, useState } from 'react'

import { View, Navigator } from '@tarojs/components'
import { getApp, getUserProfile, login, request, showToast } from '@tarojs/taro'
import { Cell } from '@taroify/core';
import AvatarCard from './components/avatar-card';
import IconFont from '../../components/iconfont';
import { BASE_URL } from '../../utils';

import './index.scss'
import { getCurrentUser, IUser, setCurrentUser, updateUserInfo, wxLogin } from '../../api';

function UserPage(){
  const [user, setUser] = useState<Partial<IUser>>({});
  console.log('render user', user);
  const handleAvatar = useCallback(function handleAvatar() {
    getUserProfile({
      desc: '用于关联瞬间',
      success(res) {
        console.log(res);
        wxLogin(res.userInfo).then((userInfo) => {
          console.log(userInfo);
          setUser(userInfo);
          setCurrentUser(userInfo);
        })
      },
      fail({errMsg}) {
        console.log(errMsg);
      }
    })
  }, [])

  useEffect(() => {
    const user = getCurrentUser();
    if (user) {
      setUser({});
    } else {
      setUser(user);
    }
  }, []);

  return (
    <View className='user-page page'>
      <AvatarCard
        onClick={handleAvatar}
        userInfo={{
          avatar: user?.userPicUrl || 'https://pic3.zhimg.com/aadd7b895_xs.jpg',
          nickname: user?.userName || '请先登录',
        }}
      />

      <View className='operate-card'>
        <Navigator url='/pages/my-instantaneous/index' >
          <Cell
            className='operate'
            size='medium'
            title='我的感动瞬间'
            rightIcon={<IconFont name='arrow' size={20} />}
          />
        </Navigator>
        <Navigator url='/pages/my-like/index' >
          <Cell
            className='operate'
            size='medium'
            title='我的喜欢'
            rightIcon={<IconFont name='arrow' size={20} />}
          />
        </Navigator>
        </View>

      <View className='operate-card'>
      <Navigator url='/pages/institution/index' >
        <Cell
          className='operate'
          size='medium'
          title='我的机构'
          rightIcon={<IconFont name='arrow' size={20} />}
        />
      </Navigator>
        </View>
        <View className='operate-card'>
          <Cell
            className='operate'
            size='medium'
            title='关于我们'
            rightIcon={<IconFont name='arrow' size={20} />}
          />
          <Cell
            className='operate'
            size='medium'
            title='联系我们'
            rightIcon={<IconFont name='arrow' size={20} />}
          />
        </View>
    </View>
  )
}

export default UserPage
