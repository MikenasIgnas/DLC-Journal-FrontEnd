/* eslint-disable max-len */
import React                    from 'react'
import { useParams }            from 'react-router-dom'
import { UploadOutlined }       from '@ant-design/icons'
import { Upload, UploadProps }  from 'antd'
import { useAppSelector }       from '../../store/hooks'
import { RcFile }               from 'antd/es/upload'
import axiosPost                from '../../Plugins/axiosPost'

type PhotoUploaderProps = {
    dutiesId:           number | undefined,
    setIsPhotoUploaded: React.Dispatch<React.SetStateAction<boolean>>,
}
const PhotoUploader = ({ dutiesId, setIsPhotoUploaded }: PhotoUploaderProps) => {
  const { id } =        useParams()
  const defaultTheme =  useAppSelector((state) => state.theme.value)

  const props: UploadProps = {
    name:    'file',
    headers: {
      authorization: 'authorization-text',
    },
    customRequest: async(info) => {
      const formData = new FormData()
      formData.append('file', info.file as RcFile)
      await axiosPost(`uploadPhoto?photoId=${dutiesId}&checklistId=${id}`, formData)
      setIsPhotoUploaded(true)
    },
  }

  return (
    <Upload listType='picture-circle'showUploadList={false} {...props} style={{width: '19%', marginLeft: '15px'}}>
      <UploadOutlined style={{marginLeft: '15px', marginRight: '15px', cursor: 'pointer', color: defaultTheme ? 'white' : 'black'}}/>
    </Upload>
  )
}

export default PhotoUploader