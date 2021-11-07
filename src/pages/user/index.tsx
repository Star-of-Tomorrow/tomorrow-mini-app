import React, { useEffect } from 'react'

import { View, Navigator } from '@tarojs/components'
import { Cell } from '@taroify/core';
import AvatarCard from './components/avatar-card';
import IconFont from '../../components/iconfont';
import { login, request, showToast } from '@tarojs/taro'
import './index.scss'


function UserPage(){
  useEffect(() => {
    login({
      success: function (res) {
        if (res.code) {

          //发起网络请求
          request({
            url: 'http://172.18.188.165:9090/demo/user/wx/login',
            data: {
              code: res.code
            },
            method: 'POST',
            success() {
              showToast({
                title: '调用成功'
              })
            },
            fail({ errMsg }) {
              showToast({title: errMsg });
            }
          })
        } else {
          showToast({
            title: '登录失败！' + res.errMsg
          })
          console.log('登录失败！' + res.errMsg)
        }
      },
      fail({ errMsg }) {
        showToast({
          title: errMsg || '登录失败'
        })
      }
    });
  }, [])

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
