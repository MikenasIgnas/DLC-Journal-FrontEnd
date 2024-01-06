/* eslint-disable max-len */
import React                                      from 'react'
import { Modal, Form, Button, Input, UploadFile } from 'antd'
import { useForm }                                from 'antd/es/form/Form'
import { post, uploadPhoto }                      from '../../../../Plugins/helpers'
import { useCookies }                             from 'react-cookie'
import PhotoUploader                              from '../../../UniversalComponents/PhotoUploader/PhotoUploader'
import ColocationSelectors                        from '../ClientsCollocationsTab/CollocationSelectors'
import { CollocationsType }                       from '../../../../types/globalTypes'
import { useAppDispatch }                         from '../../../../store/hooks'
import { setOpenSubClientAdditionModal }          from '../../../../auth/ModalStateReducer/ModalStateReducer'

type AdditionModalProps = {
    postUrl:            string;
    additionModalTitle: string;
    collocations:       CollocationsType[] | undefined
}

type CompanyFormType = {
  companyName?:           string,
  companyDescription?:    string,
  companyPhoto?:          string,
  subClient?: {
    subClientId:          string;
    subClientCompanyName: string
    }[]
  J13?: {
    [key: string]: string[];
  }[];
  T72?: {
    [key: string]: string[];
  }[];
};

const SubClientAdditionModal = ({postUrl, additionModalTitle, collocations}: AdditionModalProps) => {
  const [cookies]                 = useCookies(['access_token'])
  const [form]                    = useForm()
  const [uploading, setUploading] = React.useState(false)
  const [fileList, setFileList]   = React.useState<UploadFile[]>([])
  const dispatch                  = useAppDispatch()
  const filterObject = (obj: CompanyFormType): CompanyFormType => {
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
    await post(postUrl, filteredResult, cookies.access_token)
    if(fileList[0]){
      uploadPhoto(fileList[0],setUploading, setFileList, `uploadCompanysPhoto?companyName=${values.companyName}`)
    }
    dispatch(setOpenSubClientAdditionModal(false))
  }

  return (
    <Modal
      title={additionModalTitle}
      centered
      open
      onOk={() => dispatch(setOpenSubClientAdditionModal(false))}
      onCancel={() => dispatch(setOpenSubClientAdditionModal(false))}
      footer={false}
      width={'70%'}
    >
      <Form style={{textAlign: 'center'}} form={form} onFinish={addCompany}>
        <div>
          <Form.Item rules={[{ required: true, message: 'Įveskite įmonės pavadinimą'}]} name='companyName'>
            <Input placeholder='Įmonės pavadinimas'/>
          </Form.Item>
          <Form.Item name='companyDescription'>
            <Input placeholder='Įmonės apibūdinimas'/>
          </Form.Item>
          <PhotoUploader setFileList={setFileList} fileList={fileList}/>
          <div style={{display: 'flex', justifyContent: 'space-evenly'}}>
            {collocations?.map((colocation, i) =>
              colocation.premises ? <ColocationSelectors key={i} collocationSite={colocation.site} colocationPremises={colocation.premises} colocationId={colocation.id}/> : null)}
          </div>
        </div>
        <Button loading={uploading} htmlType='submit'>Pridėti</Button>
      </Form>
    </Modal>
  )
}

export default SubClientAdditionModal