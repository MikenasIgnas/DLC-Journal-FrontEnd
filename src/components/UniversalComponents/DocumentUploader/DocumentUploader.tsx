/* eslint-disable @typescript-eslint/no-explicit-any */
import React                                                from 'react'
import { DownloadOutlined, StarOutlined, UploadOutlined }   from '@ant-design/icons'
import { Button, Upload }                                   from 'antd'
import type { RcFile, UploadFile, UploadProps }             from 'antd/es/upload/interface'
import { downloadFile }                                     from '../../../Plugins/helpers'
import { useCookies }                                       from 'react-cookie'

type CompanyPhotoUploaderProps = {
  setFileList:  React.Dispatch<React.SetStateAction<UploadFile<RcFile>[]>>
  fileList:     UploadFile<RcFile>[]
  defFileList: any[]
}

const DocumentUploader = ({ fileList, setFileList, defFileList }: CompanyPhotoUploaderProps) => {
  const [cookies]           = useCookies(['access_token'])
  const props: UploadProps  = {
    maxCount: 1000,
    multiple: true,
    onRemove: (file) => {
      const index = fileList ? fileList.indexOf(file) : -1
      if (index !== -1) {
        const newFileList = fileList.slice()
        newFileList.splice(index, 1)
        setFileList(newFileList)
      }
    },

    beforeUpload: (file) => {
      setFileList([...fileList, file])
      return false
    },

    showUploadList: {
      showDownloadIcon: true,
      downloadIcon:     <DownloadOutlined/>,
      showRemoveIcon:   true,
      removeIcon:       <StarOutlined />,
    },

    onDownload: (file) => {
      downloadFile(`company/document?fileName=${file.name}`, cookies.access_token)
    },
  }

  return (
    <div style={{display: 'flex', justifyContent: 'center', paddingBottom: '10px'}}>
      <Upload defaultFileList={[...defFileList]} listType='picture-card' {...props}>
        <Button icon={<UploadOutlined rev='' />}></Button>
      </Upload>
    </div>
  )
}

export default DocumentUploader