import React                            from 'react'
import { UploadOutlined }               from '@ant-design/icons'
import { Button, Upload }               from 'antd'
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface'

type CompanyPhotoUploaderProps = {
  setFileList: React.Dispatch<React.SetStateAction<UploadFile<RcFile>[]>>
  fileList: UploadFile<RcFile>[]
}

const PhotoUploader = ({ fileList, setFileList }: CompanyPhotoUploaderProps) => {
  const props: UploadProps = {
    maxCount: 1,
    multiple: false,
    onRemove: (file) => {
      const index = fileList.indexOf(file)
      const newFileList = fileList.slice()
      newFileList.splice(index, 1)
      setFileList(newFileList)
    },
    beforeUpload: (file) => {
      setFileList([file])
      return false
    },
    fileList ,
  }

  return (
    <div style={{display: 'flex', justifyContent: 'center', paddingBottom: '10px'}}>
      <Upload listType='picture' {...props}>
        <Button icon={<UploadOutlined rev='' />}>Pridėti nuotrauką</Button>
      </Upload>
    </div>
  )
}

export default PhotoUploader