/* eslint-disable max-len */
import React                                              from 'react'
import { Modal, Form, Checkbox, Button, Collapse, Input, UploadFile, message } from 'antd'
import { useForm }                                        from 'antd/es/form/Form'
import { get, post, uploadPhoto }                                            from '../../Plugins/helpers'
import { useCookies }                                     from 'react-cookie'
import CompanyPhotoUploader                               from './CompanyPhotoUploader'
import { RcFile } from 'antd/es/upload'

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
  const { Panel } =                             Collapse
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
    console.log(values)
    filteredResult.companyName = values.companyName
    filteredResult.companyDescription = values.companyDescription
    await post('addCompany', filteredResult, cookies.access_token)
    uploadPhoto(fileList[0],setUploading, setFileList, `uploadCompanysPhoto?company=${values.companyName}`)
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
          <Form.Item name='companyName'>
            <Input placeholder='Įmonės pavadinimas'/>
          </Form.Item>
          <Form.Item name='companyDescription'>
            <Input placeholder='Įmonės apibūdinimas'/>
          </Form.Item>
          <CompanyPhotoUploader setFileList={setFileList} fileList={fileList}/>
          {collocations?.map((colocation, i) => {
            return (
              <Collapse style={{marginBottom: '10px', marginTop: '10px'}} key={i}>
                <Panel style={{padding: '10px'}} header={colocation.site} key={i}>
                  <Form.List
                    name={colocation.site}
                    initialValue={colocation.premises.map((ele:any) => ({[ele.premiseName]: []}))}
                  >
                    {(fields) => {
                      return fields.map(({ name, ...rest }, index) => {
                        const premise = colocation.premises[index]
                        return(
                          <Collapse key={index}>
                            <Panel key={colocation.id} header={premise.premiseName}>
                              <Form.Item name={[name, premise.premiseName]}>
                                <Checkbox.Group options={premise.racks} style={{display: 'block', padding: ' 5px'}} />
                              </Form.Item>
                            </Panel>
                          </Collapse>
                        )
                      })}
                    }
                  </Form.List>
                </Panel>
              </Collapse>
            )
          })}
        </div>
        <Button loading={uploading} htmlType='submit'>Pridėti</Button>
      </Form>
    </Modal>
  )
}

export default AdditionModal