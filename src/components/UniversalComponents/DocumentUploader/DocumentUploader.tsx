/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React                                                from 'react'
import { DeleteOutlined, DownloadOutlined, UploadOutlined } from '@ant-design/icons'
import { Button, Upload }                                   from 'antd'
import type { UploadFile, UploadProps }                     from 'antd/es/upload/interface'
import { deleteItem, downloadFile, postDocument }           from '../../../Plugins/helpers'
import { useCookies }                                       from 'react-cookie'
import { useParams }                                        from 'react-router'

type CompanyPhotoUploaderProps = {
  setUploading:     React.Dispatch<React.SetStateAction<boolean>>
  companyDocuments: string[] | undefined
}

const DocumentUploader = ({ setUploading, companyDocuments }: CompanyPhotoUploaderProps) => {
  const [cookies]       = useCookies(['access_token'])
  const [, setFileList] = React.useState<UploadFile[]>([])
  const {id}            = useParams()

  const defaultFileList: UploadFile<any>[] = companyDocuments?.map((el, i) => ({
    uid:    String(i),
    name:   el,
    status: 'done',
  })) || []

  const props: UploadProps  = {
    multiple: true,
    onRemove: async(file) => {
      await deleteItem('company/document', {id: id, file: file}, cookies.access_token)
      setFileList((currentFileList) => currentFileList.filter(f => f.uid !== file.uid))
    },

    beforeUpload: async(file) => {
      setUploading(true)
      const res = await postDocument('company/document', {id: id, file: file}, cookies.access_token, file, setUploading, setFileList)
      setFileList([...res.document, file])
      setUploading(false)
      return false
    },

    showUploadList: {
      showPreviewIcon:  false,
      showDownloadIcon: true,
      downloadIcon:     <DownloadOutlined/>,
      showRemoveIcon:   true,
      removeIcon:       <DeleteOutlined />,
    },

    onDownload: (file) => {
      downloadFile(`company/document?fileName=${file.name}`, cookies.access_token)
    },
  }

  return (
    <div style={{display: 'flex', justifyContent: 'center', paddingBottom: '10px'}}>
      <Upload defaultFileList={[...defaultFileList]} listType='picture-card' {...props}>
        <Button icon={<UploadOutlined rev='' />}></Button>
      </Upload>
    </div>
  )
}

export default DocumentUploader