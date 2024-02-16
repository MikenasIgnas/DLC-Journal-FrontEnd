/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React                        from 'react'
import { Button, type UploadFile }  from 'antd'
import { post }                     from '../../../Plugins/helpers'
import { useCookies }               from 'react-cookie'
import { useParams }                from 'react-router-dom'
import DocumentUploader             from '../../UniversalComponents/DocumentUploader/DocumentUploader'


type ClientsDocumentsTabProps = {
  companyDocuments: string[] | undefined
}

const ClientsDocumentsTab = ({companyDocuments}: ClientsDocumentsTabProps) => {
  const [fileList, setFileList]   = React.useState<UploadFile[]>([])
  const [cookies]                 = useCookies(['access_token'])
  const {id}                      = useParams()
  const [, setUploading]          = React.useState(false)

  const saveChanges = async(values: any) => {
    values.id = id
    values.file = fileList[0]
    await post('company/document', values, cookies.access_token, fileList[0], setUploading, setFileList)
  }

  const defaultFileList: any[] = companyDocuments?.map((el, i) => ({
    uid:    i,
    name:   el,
    status: 'done',
  }))

  return(
    <>
      <DocumentUploader setFileList={setFileList} fileList={fileList} defFileList={defaultFileList}/>
      <Button onClick={saveChanges}>Add</Button>
    </>
  )
}

export default ClientsDocumentsTab