import React, { useEffect, useState } from "react";
import { View, Button, Form, Textarea } from "@tarojs/components";
import { Uploader } from "@taroify/core";
import { chooseImage, navigateTo } from "@tarojs/taro";
import { createComments, IInformationDTO, InformationTypeEnum } from "../../api";

import "./index.scss";

function MessagePublishPage() {
  const [files, setFiles] = useState<Uploader.File[]>([]);

  const formSubmit = async (e) => {
    let urlsRes: string[] = [];

    files.forEach((item: { url: string }) => {
      urlsRes.push(item.url);
    });

    // TODO: 发布 id
    const comment: IInformationDTO = {
      //   userId: string;
      //   informationId: string;
      informationName: e.detail.value.title,
      informationContent: e.detail.value.content,
      // 图片地址
      urls: urlsRes,
      // comments?: IComment[];
      informationType: InformationTypeEnum.INFORMATION,
      createTime: Date(),
    };
    await createComments(comment);

    // 发布结束,跳转至留言列表
    navigateTo({ url: "/pages/activity-detail-message/index" });
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
    <View className='MessagePublishPage page'>
      <View className='create-form'>
        <Form onSubmit={formSubmit}>
          <View className='example-body'>
            <Textarea
              name='content'
              placeholder='请输入您的留言 ...'
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

export default MessagePublishPage;
