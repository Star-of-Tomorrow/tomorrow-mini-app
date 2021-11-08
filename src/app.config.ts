import { Config } from "@tarojs/taro";

import { useGlobalIconFont } from "./components/iconfont/helper";

const appConfig: Config = {
  pages: [
    "pages/instantaneous/index",
    "pages/activity/index",
    "pages/user/index",
    "pages/institution/index",
    "pages/my-like/index",
    "pages/activity-detail/index",
    "pages/create-instantaneous/index",
    "pages/activity-create/index",
    "pages/institution-manage/index",
    "pages/my-instantaneous/index",
    "pages/activity-detail-message/index",
    "pages/activity-detail-message-publish/index",
  ],

  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#ff840a",
    navigationBarTitleText: "瞬间",
  },
  tabBar: {
    color: "#f5baa0",
    selectedColor: "#ff840a",
    backgroundColor: "#ffffff",
    list: [
      {
        pagePath: "pages/instantaneous/index",
        text: "瞬间",
        iconPath: "assets/image/instantaneous-light.png",
        selectedIconPath: "assets/image/instantaneous.png",
      },
      {
        pagePath: "pages/activity/index",
        text: "活动",
        iconPath: "assets/image/activity-light.png",
        selectedIconPath: "assets/image/activity.png",
      },
      {
        pagePath: "pages/user/index",
        text: "个人",
        iconPath: "assets/image/user-light.png",
        selectedIconPath: "assets/image/user.png",
      },
    ],
  },
  // eslint-disable-next-line react-hooks/rules-of-hooks
  usingComponents: Object.assign({}, useGlobalIconFont()),
};
export default appConfig;
