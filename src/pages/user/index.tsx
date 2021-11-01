import React from 'react'

import { View, Navigator } from '@tarojs/components'
import { Cell } from '@taroify/core';
import AvatarCard from './components/avatar-card';
import IconFont from '../../components/iconfont';
import './index.scss'


function UserPage(){
  return <View className='user-page page'>
    <AvatarCard userInfo={{
      avatar: 'https://pic3.zhimg.com/aadd7b895_xs.jpg',
      nickname: '长长的用户名'
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
}

export default UserPage
