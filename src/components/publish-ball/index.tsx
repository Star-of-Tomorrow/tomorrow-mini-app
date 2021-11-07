import React from 'react'
import { Navigator, View } from '@tarojs/components'
import './index.scss'
import IconFont from '../iconfont'

export interface PublishBallProps  {
  className?: string
  children?:React.ReactNode
  style?:string|React.CSSProperties|undefined
}

function PublishBall(props:PublishBallProps){
  const {

  } = props
  return (
    <View className='publish-ball'>
      <Navigator url='/pages/create-instantaneous/index'>
        <IconFont name='plus' />
      </Navigator>
    </View>
  )
}
export { PublishBall }
