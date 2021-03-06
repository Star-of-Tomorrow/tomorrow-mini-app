/* tslint:disable */
/* eslint-disable */

import React, { FunctionComponent } from 'react';

export type IconNames = 'plus' | 'create' | 'pen' | 'list' | 'comments' | 'admin' | 'dot' | 'dot-end' | 'localhost' | 'dian' | 'arrow' | 'share' | 'share1' | 'like' | 'like-o' | 'share2' | 'user-circle-o' | 'user' | 'icon-test' | 'jingcaishunjian' | 'activity' | 'activity-light' | 'instantaneous-copy' | 'instantaneous-light-copy' | 'user-light-copy' | 'user-copy';

export interface IconProps {
  name: IconNames;
  size?: number;
  color?: string | string[];
  style?: React.CSSProperties;
}

const IconFont: FunctionComponent<IconProps> = () => {
  return null;
};

export default IconFont;
