import { Config } from '@tarojs/taro';

const appConfig: Config = {
  pages: ["pages/instantaneous/index", "pages/activity/index", "pages/user/index"],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#ff840a',
    navigationBarTitleText: '瞬间',
  },
  tabBar: {
    color: '#f5baa0',
    selectedColor: '#ff840a',
    backgroundColor: '#ffffff',
    list: [
      {
        pagePath: "pages/instantaneous/index",
        text: '瞬间',
        iconPath: "assets/image/instantaneous-light.png",
        selectedIconPath: "assets/image/instantaneous.png",
      },
      {
        pagePath: "pages/activity/index",
        text: '活动',
        iconPath: "assets/image/activity-light.png",
        selectedIconPath: "assets/image/activity.png",
      },
      {
        pagePath: "pages/user/index",
        text: '个人',
        iconPath: "assets/image/user-light.png",
        selectedIconPath: "assets/image/user.png",
      }
    ]
  }
};

export default appConfig;
