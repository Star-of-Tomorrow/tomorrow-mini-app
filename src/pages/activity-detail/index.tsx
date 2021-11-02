import React from 'react'

import { View, Text, Image } from '@tarojs/components'
import { Steps } from "@taroify/core"
import Sudoku from '../../components/sudoku'
import IconFont from '../../components/iconfont';
import InstantaneousCard, { IInstantaneousItem } from '../../components/instantaneous-card';

import './index.scss'

const mockData = {
  step: 2,
  intitution: {
    name: '机构名字',
    avatar: 'https://pic3.zhimg.com/aadd7b895_xs.jpg',
  },
  list: [{
    id: 1,
    publishTime: "2021-10-22 12:00:00",
    text: "Taro 是一个开放式跨端跨框架解决方案，支持使用 React/Vue/Nerv 等框架来开发 微信 / 京东 / 百度 / 支付宝 / 字节跳动 / QQ 小程序 / H5 / RN 等应用。",
    images: [
      "https://pic3.zhimg.com/aadd7b895_xs.jpg",
      "https://pic3.zhimg.com/aadd7b895_xs.jpg",
      "https://pic3.zhimg.com/aadd7b895_xs.jpg",
      "https://pic3.zhimg.com/aadd7b895_xs.jpg",
      "https://pic3.zhimg.com/aadd7b895_xs.jpg",
      "https://pic3.zhimg.com/aadd7b895_xs.jpg",
      "https://pic3.zhimg.com/aadd7b895_xs.jpg"
    ]
  },
    {
      id: 2,
      publishTime: "3小时前",
      text: "Taro 是一个开放式跨端跨框架解决方案，支持使用 React/Vue/Nerv 等框架来开发 微信 / 京东 / 百度 / 支付宝 / 字节跳动 / QQ 小程序 / H5 / RN 等应用。",
      images: []
    },

    {
      id: 2,
      publishTime: "2021-10-22 12:00:00",
      text: "Taro 是一个开放式跨端跨框架解决方案，支持使用 React/Vue/Nerv 等框架来开发 微信 / 京东 / 百度 / 支付宝 / 字节跳动 / QQ 小程序 / H5 / RN 等应用。",
      images: []
    }]
}

const comments = [
  {
    "id": 1,
    "publishType": "user",
    "publisher": {
      "avatar": "https://pic3.zhimg.com/aadd7b895_xs.jpg",
      "nickname": "Taro"
    },
    likeCount: 1,
    "graphic": {
      "text": "Taro 是一个开放式跨端跨框架解决方案，支持使用 React/Vue/Nerv 等框架来开发 微信 / 京东 / 百度 / 支付宝 / 字节跳动 / QQ 小程序 / H5 / RN 等应用。",
      "images": [
        "https://pic3.zhimg.com/aadd7b895_xs.jpg",
        "https://pic3.zhimg.com/aadd7b895_xs.jpg",
        "https://pic3.zhimg.com/aadd7b895_xs.jpg",
      ]
    },
    "isLiked": false,
    publishTime: "2021-10-22 12:00:00",
  },
] as IInstantaneousItem[];
function IndexPage(){
  return (
    <View className='activity-defailt-page page'>
      <View className='activity-detail' >

      <View className='activity-institution'>
        <Image className='institution-avatar' src={mockData.intitution.avatar} />
        <Text className='institution-name'>{mockData.intitution.name}</Text>
      </View>
      <View className='activity-body'>
        <Steps direction='vertical' value={mockData.step}>
          {mockData.list.map((step, idx) => (
            <Steps.Step icon={<IconFont  name={idx === 0 ? 'localhost' : idx === mockData.list.length - 1 ? 'dot-end' : 'dot'} />} key={step.id}>
              <View className='step-container'>
                <View className='activity-text-container'>
                  <Text className='activity-item-text'>{step.text}</Text>
                </View>
                  <Sudoku images={step.images} />
                </View>
                <Text className="activity-date">{step.publishTime}</Text>
            </Steps.Step>
          ))}
        </Steps>
      </View>
      </View>
      <View className='comments-area'>
          <View className='comments-header'>
            <Text className='commments-header-text'>留言区</Text>
          </View>
          <View className='comments-body'>
          {comments.map((comment: IInstantaneousItem) => (
            <InstantaneousCard key={String(comment.id)} data={comment} />
          ))}
          </View>
      </View>
      <View className='comments-operate'>
        <IconFont name='pen' size={50} />
        <IconFont name='like-o' size={50} />
        <IconFont name='share' size={50} />
      </View>
    </View>
  );
}

export default IndexPage
