import React, { useState } from 'react'

import { chooseImage } from '@tarojs/taro';
import { View, Input } from '@tarojs/components'
import { Uploader, Button } from "@taroify/core"
import './index.scss'
import UploaderImage from '@taroify/core/uploader/uploader-image';


function IndexPage(){

  const [file, setFile] = useState<Uploader.File>()
  function handleUploadImage() {
    chooseImage({
      count: 1,
      sizeType: ["original", "compressed"],
      sourceType: ["album", "camera"],
    }).then(({ tempFiles }) => {
      // setFile({
      //   url: tempFiles[0].path,
      //   type: tempFiles[0].type,
      //   name: tempFiles[0].originalFileObj?.name,
      // })
    })
  }

  return <View className='create-instantaneous page'>
    <View className='publish-row'>
      <Input className='instantaneous-textarea'  type='text' placeholder='请输入你的公益精彩瞬间' placeholderClass='placeholder' />
    </View>
    <View className='publish-row'>
      <Uploader
        value={file}
        onUpload={handleUploadImage}
        onChange={setFile}
      />
    </View>
    <View className='publish-row publish-btn'>
      <Button variant="contained" color='warning'>发布</Button>
    </View>
  </View>
}

export default IndexPage
