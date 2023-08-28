/* eslint-disable no-prototype-builtins */
/* eslint-disable max-len */
import React                                                                          from 'react'
import { Modal, Form, Checkbox, Button, Collapse, Input, UploadFile, ConfigProvider } from 'antd'
import { useForm }                                                                    from 'antd/es/form/Form'
import { get, post, uploadPhoto }                                                     from '../../Plugins/helpers'
import { useCookies }                                                                 from 'react-cookie'
import CompanyPhotoUploader                                                           from './CompanyPhotoUploader'
import ColocationSelectors from '../HisotryPageElements/CollocationSelectors'

type AdditionModalProps = {
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
    setIsCompanyAdded: React.Dispatch<React.SetStateAction<boolean>>
}

type CompanyFormType = {
  companyName?: string,
  companyDescription?: string,
  companyPhoto?: string,
  J13?: {
    [key: string]: string[];
  }[];
  T72?: {
    [key: string]: string[];
  }[];
};

const AdditionModal = ({setIsModalOpen, setIsCompanyAdded}: AdditionModalProps) => {
  const [cookies] =                             useCookies(['access_token'])
  const [collocations, setCollocations] =       React.useState<any[]>()
  const [form] =                                useForm()
  const [uploading, setUploading] =             React.useState(false)
  const [fileList, setFileList] =               React.useState<UploadFile[]>([])

  React.useEffect(() => {
    (async () => {
      try{
        const collocations = await get('getCollocations', cookies.access_token)
        setCollocations(collocations.data[0].colocations)
      }catch(err){
        console.log(err)
      }
    })()
  },[])

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
    await post('addCompany', filteredResult, cookies.access_token)
    if(fileList[0]){
      uploadPhoto(fileList[0],setUploading, setFileList, `uploadCompanysPhoto?company=${values.companyName}`)
    }
    setIsCompanyAdded(true)
    setIsModalOpen(false)
  }

  return (
    <Modal
      title='Pridėkite įmonę'
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
          <CompanyPhotoUploader setFileList={setFileList} fileList={fileList}/>
          <div style={{display: 'flex', justifyContent: 'space-evenly'}}>
            {collocations?.map((colocation, i) => <ColocationSelectors key={i} collocationSite={colocation.site} colocationPremises={colocation.premises} colocationId={colocation.id}/>)}
          </div>
        </div>
        <Button loading={uploading} htmlType='submit'>Pridėti</Button>
      </Form>
    </Modal>
  )
}

export default AdditionModal