import React, { useEffect, useState } from "react";
import { View, Image, Form, Input, Textarea, Button } from "@tarojs/components";
import { chooseImage, showToast } from "@tarojs/taro";
import { Uploader } from "@taroify/core";
import { createActivity, getInstitution, IActivity, IInformationDTO, IInstitution } from "../../api/opearation";
import "./index.scss";
import { getCurrentUser, uploadImage } from "../../api";
import { DEFAUL_IMAGE_URL } from "../../components/constants";

function CreateActivityPage() {
  const [files, setFiles] = useState<Uploader.File[]>([]);
  const [institution, setInstitution] = useState<Partial<IInstitution>>({})
  useEffect(() => {
    const user = getCurrentUser()
    if (!user) {
      return showToast({ title: "请先登录", icon: 'none' });
    }
    getInstitution(user.type).then((institutionInfo) => {
      setInstitution(institutionInfo)
    })
  }, []);

  const formSubmit = (e) => {
    let urlsRes: string[] = [];

    files.forEach((item: { url: string }) => {
      urlsRes.push(item.url);
    });

    // TODO: 发布 id
    const activityData: Partial<IInformationDTO> = {
      // id: string;

      // creator: IUser;
      userId: getCurrentUser().userId,

      informationName: e.detail.value.title,
      informationContent: e.detail.value.content,

      // 图片地址
      urls: urlsRes,
      // comments?: IComment[];
      // createTime: Date(),
    };
    createActivity(activityData)
      .then(() => {
        showToast({ title: '创建成功' });
      });
    // TODO: 发布结束的跳转问题
  };

  const uploafImage = () => {
    chooseImage({
      count: 1,
      sizeType: ["original", "compressed"],
      sourceType: ["album", "camera"],
    }).then(async ({ tempFiles }) => {
      tempFiles?.forEach(async (tempFile) => {
        const data = await uploadImage(tempFile.path);
        setFiles([
          ...files,
          ...tempFiles.map(({ path, type, originalFileObj }) => ({
            type,
            url: data,
            name: originalFileObj?.name,
          })),
        ]);
      });
    });
  };

  return (
    <View className='CreateActivityPage page'>
      <View className='institution-info'>
        <Image
          className='institution-photo'
          src={institution?.url ?? DEFAUL_IMAGE_URL}
        />
        <View className='institution-name'>{institution?.institutionsName}</View>
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
