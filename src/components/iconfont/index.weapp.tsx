/* tslint:disable */
/* eslint-disable */

import React, { FunctionComponent } from 'react';
import Taro from '@tarojs/taro';

export type IconNames = 'share' | 'share1' | 'like' | 'like-o' | 'share2' | 'user-circle-o' | 'user' | 'icon-test' | 'jingcaishunjian' | 'activity' | 'activity-light' | 'instantaneous-copy' | 'instantaneous-light-copy' | 'user-light-copy' | 'user-copy';

interface Props {
  name: IconNames;
  size?: number;
  color?: string | string[];
  style?: React.CSSProperties;
}

const IconFont: FunctionComponent<Props> = (props) => {
  const { name, size, color, style } = props;

  // @ts-ignore
  return <iconfont name={name} size={parseFloat(Taro.pxTransform(size))} color={color} style={style} />;
};

IconFont.defaultProps = {
  size: 20,
};

export default IconFont;
