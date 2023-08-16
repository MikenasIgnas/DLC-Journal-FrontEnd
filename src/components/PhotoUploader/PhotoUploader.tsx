/* eslint-disable max-len */
import React                            from 'react'
import { postImage }                         from '../../Plugins/helpers'
import { useCookies }                   from 'react-cookie'
import Resizer                          from 'react-image-file-resizer'
import { useParams }                    from 'react-router-dom'
import { UploadOutlined }               from '@ant-design/icons'
import { Upload, UploadProps, message } from 'antd'
import { useAppSelector }               from '../../store/hooks'
import { RcFile } from 'antd/es/upload'
import axiosPost from '../../Plugins/axiosPost'

type PhotoUploaderProps = {
    dutiesId:           number | undefined,
    setIsPhotoUploaded: React.Dispatch<React.SetStateAction<boolean>>,
}
const PhotoUploader = ({ dutiesId, setIsPhotoUploaded }: PhotoUploaderProps) => {
  const [cookies] =     useCookies(['access_token'])
  const { id } =        useParams()
  const defaultTheme =  useAppSelector((state) => state.theme.value)

  const props: UploadProps = {
    name:          'file',
    // action:  `http://localhost:4000/uploadPhoto?photoId=${dutiesId}&checklistId=${id}`,
    customRequest: async(info) => {
      console.log(info)
      const formData = new FormData()
      formData.append('file', info.file as RcFile)
      // formData.append('photoID', String(dutiesId) )
      console.log(Object.entries(formData).map((el) => el))
      console.log(formData.getAll('file'))
      // const uploadedPhoto = {
      //   photo:       formData,
      //   photoId:     String(dutiesId),
      //   checklistId: Number(id),
      // }
      await axiosPost(`uploadPhoto?photoId=${dutiesId}&checklistId=${id}`, formData)
      // if (info.file.status === 'done') {
      //   if (info.file.originFileObj) {
      //     const reader = new FileReader()
      //     reader.onload = async(event) => {
      //       const base64Image = event?.target?.result
      //       const blobPhoto = await fetch(base64Image as string).then((res) => res.blob())
      //       // Resizer.imageFileResizer (
      //       //   blobPhoto,
      //       //   300,
      //       //   300,
      //       //   'JPEG',
      //       //   60,
      //       //   0,
      //       //   async (resizedPhoto) => {
      //       //     setIsPhotoUploaded(!uploadPhoto.error)
      //       //   },
      //       //   'base64'
      //       // )
      //       const uploadedPhoto = {
      //         photo:       base64Image,
      //         photoId:     String(dutiesId),
      //         checklistId: Number(id),
      //       }
      //       await post('uploadPhoto', uploadedPhoto, cookies.access_token)
      //       message.success(`${info.file.name} file uploaded successfully`)
      //     }
      //     reader.readAsDataURL(info.file.originFileObj)
      //   }
      // } else if (info.file.status === 'error') {
      //   message.error(`${info.file.name} file upload failed.`)
      // }
    },
    headers: {
      authorization: 'authorization-text',

    },
  }

  return (
    <Upload showUploadList={false} {...props} style={{width: '19%', marginLeft: '15px'}}>
      <UploadOutlined style={{marginLeft: '15px', marginRight: '15px', cursor: 'pointer', color: defaultTheme ? 'white' : 'black'}}/>
    </Upload>
  )
}

export default PhotoUploader