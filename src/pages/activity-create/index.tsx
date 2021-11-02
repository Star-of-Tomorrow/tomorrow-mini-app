import React from "react";

import { View, Image, Form, Input, Textarea, Button } from "@tarojs/components";
import "./index.scss";

function CreateActivityPage() {
  const formSubmit = (e) => {
    // TODO: fabu
    console.log(12, e);
  };

  const uploafImage = () => {
    // TODO: upload
    console.log("上传");
    // Taro.chooseImage({
    //   success(res) {
    //     const tempFilePaths = res.tempFilePaths;
    //     Taro.uploadFile({
    //       url: "https://example.weixin.qq.com/upload", //仅为示例，非真实的接口地址
    //       filePath: tempFilePaths[0],
    //       name: "file",
    //       formData: {
    //         user: "test",
    //       },
    //       success(res) {
    //         const data = res.data;
    //         //do something
    //       },
    //     });
    //   },
    // });
  };

  return (
    <View className='CreateActivityPage page'>
      <View className='institution-info'>
        <Image
          className='institution-photo'
          src='assets/image/user-light.png'
        />
        <View className='institution-name'>此处机构名</View>
      </View>

      <View className='create-form'>
        <Form onSubmit={formSubmit}>
          <View className='example-body'>
            <Input type='text' placeholder='请输入活动标题' className='title' />
          </View>
          <View className='example-body'>
            <Textarea placeholder='请输入活动内容 ...' className='content' />
          </View>
          <View className='example-body'>
            <Image
              className='upload-img'
              src='assets/image/user-light.png'
              onClick={uploafImage}
            />
          </View>
          <View className='example-body'>
            <Button
              className='btn-max-w'
              plain={false}
              size='mini'
              formType='submit'
              hoverStyle='none'
            >
              发布
            </Button>
          </View>
        </Form>
      </View>
    </View>
  );
}

export default CreateActivityPage;
