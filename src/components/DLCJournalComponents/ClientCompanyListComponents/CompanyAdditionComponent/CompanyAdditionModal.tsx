/* eslint-disable max-len */
import React                                      from 'react'
import { Modal, Form, Button, Input, UploadFile } from 'antd'
import { useForm }                                from 'antd/es/form/Form'
import { post, uploadPhoto }                      from '../../../../Plugins/helpers'
import { useCookies }                             from 'react-cookie'
import PhotoUploader                              from '../../../UniversalComponents/PhotoUploader/PhotoUploader'
import ColocationSelectors                        from '../CollocationSelectors'
import { CollocationsType }                       from '../../../../types/globalTypes'

type AdditionModalProps = {
    postUrl:            string;
    additionModalTitle: string;
    setIsModalOpen:     React.Dispatch<React.SetStateAction<boolean>>
    setIsCompanyAdded:  React.Dispatch<React.SetStateAction<boolean>>
    collocations:       CollocationsType[] | undefined
}

type CompanyFormType = {
  companyName?:         string,
  companyDescription?:  string,
  companyPhoto?:        string,
  subClient?: {
    subClientId: string;
    subClientCompanyName: string
    }[]
  J13?: {
    [key: string]: string[];
  }[];
  T72?: {
    [key: string]: string[];
  }[];
};

const CompanyAdditionModal = ({postUrl, additionModalTitle, collocations, setIsModalOpen, setIsCompanyAdded}: AdditionModalProps) => {
  const [cookies] =                       useCookies(['access_token'])
  const [form] =                          useForm()
  const [uploading, setUploading] =       React.useState(false)
  const [fileList, setFileList] =         React.useState<UploadFile[]>([])

  function filterObject(obj: CompanyFormType): CompanyFormType {
    const filteredObj: CompanyFormType = {}
    if (obj.J13) {
      filteredObj.J13 = []
      for (const key in obj.J13) {
        const entries = Object.entries(obj.J13[key])
        if (entries.length > 0) {
          const nonEmptyEntry = entries.find(([_, values]) => values.length > 0)
          if (nonEmptyEntry) {
            filteredObj.J13.push({ [nonEmptyEntry[0]]: nonEmptyEntry[1] })
          }
        }
      }
    }
    if (obj.T72) {
      filteredObj.T72 = []
      for (const key in obj.T72) {
        const entries = Object.entries(obj.T72[key])
        if (entries.length > 0) {
          const nonEmptyEntry = entries.find(([_, values]) => values.length > 0)
          if (nonEmptyEntry) {
            filteredObj.T72.push({ [nonEmptyEntry[0]]: nonEmptyEntry[1] })
          }
        }
      }
    }
    return filteredObj
  }
  const addCompany = async(values: CompanyFormType) => {
    const filteredResult = filterObject(values)
    filteredResult.companyName = values.companyName
    filteredResult.companyDescription = values.companyDescription
    filteredResult.companyPhoto = ''
    filteredResult.subClient = []
    await post(postUrl, filteredResult, cookies.access_token)
    if(fileList[0]){
      uploadPhoto(fileList[0],setUploading, setFileList, `uploadCompanysPhoto?companyName=${values.companyName}`)
    }
    setIsCompanyAdded(true)
    setIsModalOpen(false)
  }

  return (
    <Modal
      title={additionModalTitle}
      centered
      open
      onOk={() => setIsModalOpen(false)}
      onCancel={() => setIsModalOpen(false)}
      footer={false}
    >
      <Form form={form} onFinish={addCompany}>
        <div>
          <Form.Item rules={[{ required: true, message: 'Įveskite įmonės pavadinimą'}]} name='companyName'>
            <Input placeholder='Įmonės pavadinimas'/>
          </Form.Item>
          <Form.Item name='companyDescription'>
            <Input placeholder='Įmonės apibūdinimas'/>
          </Form.Item>
          <PhotoUploader setFileList={setFileList} fileList={fileList}/>
          <div style={{display: 'flex', justifyContent: 'space-evenly'}}>
            {collocations?.map((colocation, i) => <ColocationSelectors key={i} collocationSite={colocation.site} colocationPremises={colocation.premises} colocationId={colocation.id}/>)}
          </div>
        </div>
        <Button loading={uploading} htmlType='submit'>Pridėti</Button>
      </Form>
    </Modal>
  )
}

export default CompanyAdditionModal