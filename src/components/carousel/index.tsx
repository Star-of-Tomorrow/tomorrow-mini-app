import React, { useEffect, useState } from 'react'
import { Swiper } from '@taroify/core'
import { View, Image } from '@tarojs/components'
import { getShuffling, IInformationDTO, InformationTypeEnum } from '../../api'


import './index.scss'

import { createInformationDTO } from '../../pages/mock'
import { DEFAUL_IMAGE_URL } from '../constants'


function createShuffling() {
  return [
    createInformationDTO(),
    createInformationDTO(),
    createInformationDTO(),
  ]
}

export interface CarouselProps  {
}

function Carousel(props:CarouselProps){
  const [shuffings, setShulffings] = useState<IInformationDTO[]>([]);

  useEffect(() => {
    getShuffling(InformationTypeEnum.ACTIVITY)
      .then(data => {
        console.log('轮播图数据', data);
        // data = createShuffling();
        // console.log(data);
        setShulffings(data);
      })
  }, [])

  const {

  } = props
  return <Swiper className='basic-swiper' autoplay={1000}>
    {
      shuffings.map((shuffing) => {
        return <Swiper.Item key={shuffing.informationId}>
          <Image mode='aspectFill' className='shuffing' src={shuffing.urls?.[0] ?? DEFAUL_IMAGE_URL} />
        </Swiper.Item>
      })
    }
  </Swiper>
}
export { Carousel }
