/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React                    from 'react'
import { useParams }            from 'react-router'
import { useCookies }           from 'react-cookie'
import {
  Button,
  Upload,
}                               from 'antd'
import {
  DeleteOutlined,
  DownloadOutlined,
  UploadOutlined,
}                               from '@ant-design/icons'
import type {
  UploadFile,
  UploadProps,
}                               from 'antd/es/upload/interface'

import {
  deleteItem,
  downloadFile,
  postDocument,
}                               from '../../../Plugins/helpers'
import {
  useAppDispatch,
  useAppSelector,
}                               from '../../../store/hooks'
import { setCompanyDocuments }  from '../../../auth/SingleCompanyReducer/SingleCompanyReducer'

const DocumentUploader = () => {
  const [cookies]               = useCookies(['access_token'])
  const [fileList, setFileList] = React.useState<UploadFile[]>([])
  const { id }                  = useParams()
  const companyDocuments        = useAppSelector((state) => state.singleCompany.companyDocuments)
  const dispatch                = useAppDispatch()

  React.useEffect(() => {
    const formattedFileList = companyDocuments?.map((el) => ({
      uid:    el._id,
      name:   el.name,
      format: el.format,
      status: 'done',
    })) || []
    setFileList(formattedFileList as any[])
  }, [companyDocuments])

  const props: UploadProps = {
    multiple: true,
    onRemove: async (file) => {
      await deleteItem('company/document', { id: file.uid }, cookies.access_token)
      setFileList((currentFileList) => currentFileList.filter(f => f.uid !== file.uid))
    },
    beforeUpload: async (file) => {
      const res = await postDocument('company/document', { companyId: id, file: file }, cookies.access_token, file, setFileList)
      setFileList([...fileList, file])
      dispatch(setCompanyDocuments([...companyDocuments, res]))
      return false
    },
    showUploadList: {
      showPreviewIcon:  false,
      showDownloadIcon: true,
      downloadIcon:     <DownloadOutlined />,
      showRemoveIcon:   true,
      removeIcon:       <DeleteOutlined />,
    },
    onDownload: (file: any) => {
      downloadFile(`company/document/file?id=${file.uid}`, file.name, file.format, cookies.access_token)
    },
  }

  return (
    <div style={{width: '100%', justifyContent: 'center', alignItems: 'center', paddingBottom: '10px' }}>
      <Upload fileList={fileList} {...props}>
        <Button icon={<UploadOutlined />}>Įkelti dokumentą</Button>
      </Upload>
    </div>
  )
}

export default DocumentUploader