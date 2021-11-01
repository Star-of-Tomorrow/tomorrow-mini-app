import React from 'react'
import { View, Image } from '@tarojs/components'
import classnames from 'classnames'
import './index.scss'

export interface SudokuProps  {
  images: string[]
}

export default function Sudoku(props:SudokuProps){
  const {
    images,
  } = props
  return <View className='sudoku'>
    {images.map((imgUrl) => (
      <Image className='image-cell' key={imgUrl} src={imgUrl} />
    ))}
  </View>
}
