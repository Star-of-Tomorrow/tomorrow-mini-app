import React, { useState } from "react";
import { View, Image, Form, Input, Textarea, Button } from "@tarojs/components";
import { chooseImage } from "@tarojs/taro";
import { Uploader } from "@taroify/core";
import { createActivity, IActivity } from "../../api/opearation";
import "./index.scss";

function CreateActivityPage() {
  const [files, setFiles] = useState<Uploader.File[]>([]);

  const formSubmit = (e) => {
    let urlsRes: string[] = [];

    files.forEach((item: { url: string }) => {
      urlsRes.push(item.url);
    });

    // TODO: 发布 id
    const activityData: IActivity = {
      // id: string;

      // creator: IUser;

      activityName: e.detail.value.title,
      activityContent: e.detail.value.content,
      // 图片地址
      urls: urlsRes,
      // comments?: IComment[];
      createTime: Date(),
    };
    createActivity(activityData);
    // TODO: 发布结束的跳转问题
  };

  const uploafImage = () => {
    chooseImage({
      count: 1,
      sizeType: ["original", "compressed"],
      sourceType: ["album", "camera"],
    }).then(({ tempFiles }) => {
      setFiles([
        ...files,
        ...tempFiles.map(({ path, type, originalFileObj }) => ({
          type,
          url: path,
          name: originalFileObj?.name,
        })),
      ]);
    });
  };

  return (
    <View className='CreateActivityPage page'>
      <View className='institution-info'>
        <Image
          className='institution-photo'
          src='https://pic3.zhimg.com/aadd7b895_xs.jpg'
        />
        <View className='institution-name'>此处机构名</View>
      </View>

      <View className='create-form'>
        <Form onSubmit={formSubmit}>
          <View className='example-body'>
            <Input
              type='text'
              name='title'
              placeholder='请输入活动标题'
              className='title'
            />
          </View>
          <View className='example-body'>
            <Textarea
              name='content'
              placeholder='请输入活动内容 ...'
              className='content'
            />
          </View>
          <View className='example-body'>
            <Uploader
              value={files}
              multiple
              onUpload={uploafImage}
              onChange={setFiles}
              className='upload-img'
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
