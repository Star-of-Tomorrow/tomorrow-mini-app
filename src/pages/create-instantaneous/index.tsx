import React, { useCallback, useState } from 'react'

import { chooseImage } from '@tarojs/taro';
import { View, Textarea, BaseEventOrig } from '@tarojs/components'
import { Uploader, Button, Toast } from "@taroify/core"

import { TextareaProps } from '@tarojs/components/types/Textarea';
import { createInstantaneous, uploadImage } from '../../api';

import './index.scss'

function IndexPage(){
  const [context, setContext] = useState('');
  const [files, setFiles] = useState<Uploader.File[]>([]);

  function handleUploadImage() {
    chooseImage({
      count: 9,
      sizeType: ["original", "compressed"],
      sourceType: ["album", "camera"],
    }).then((res) => {
      res?.tempFiles?.forEach(async (tempFile) => {
        const data = await uploadImage(tempFile.path);
        console.log('image url:', data);
        setFiles([
          ...files,
          {
            type: tempFile.type,
            url: data,
            name: tempFile.originalFileObj?.name
          },
        ]);
      })
    })
  }

  function handleTextInput(evt: BaseEventOrig<TextareaProps.onInputEventDetail>) {
    console.log('瞬间文案 ==> ', evt);
    setContext(evt.detail.value);
  }

  const handlePublishInstantance = useCallback(function handlePublishInstantance() {
    const urls = files.map(file => file.url).filter(Boolean) as string[];
    if (urls?.length === 0) {
      Toast.open({ type: 'fail', message: '请先选择图片' });
      return
    }
    if (!context) {
      Toast.open({ type: 'fail', message: '请先输入内容' });
      return;
    }

    createInstantaneous({
      userId: '1',
      informationContent: context,
      informationName: '用户名',
      urls: urls ?? [],
    })
  }, [files, context]);

  return <View className='create-instantaneous page'>
    <View className='publish-row'>
      <Textarea
        className='instantaneous-textarea'
        placeholder='请输入你的公益精彩瞬间'
        placeholderClass='placeholder'
        onInput={handleTextInput}
      />
    </View>
    <View className='publish-row'>
      <Uploader
        value={files}
        onUpload={handleUploadImage}
        onChange={setFiles}
      />
    </View>
    <View className='publish-row publish-btn'>
      <Button variant='contained' color='warning' onClick={handlePublishInstantance}>发布</Button>
    </View>


    <Toast id='toast' />
  </View>
}

export default IndexPage
