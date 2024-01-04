/* eslint-disable max-len */
import React                                                from 'react'
import { Modal, Form, Button, Input, UploadFile, message }  from 'antd'
import { useForm }                                          from 'antd/es/form/Form'
import { post, uploadPhoto }                                from '../../../../Plugins/helpers'
import { useCookies }                                       from 'react-cookie'
import PhotoUploader                                        from '../../../UniversalComponents/PhotoUploader/PhotoUploader'
import ColocationSelectors                                  from '../ClientsCollocationsTab/CollocationSelectors'
import { CollocationsType }                                 from '../../../../types/globalTypes'
import { useAppDispatch, useAppSelector }                   from '../../../../store/hooks'
import { setOpenCompaniesAdditionModal }                    from '../../../../auth/ModalStateReducer/ModalStateReducer'
import SuccessMessage                                       from '../../../UniversalComponents/SuccessMessage'

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

const CompanyAdditionModal = ({postUrl, additionModalTitle, collocations}: AdditionModalProps) => {
  const [cookies]                   = useCookies(['access_token'])
  const [form]                      = useForm()
  const [uploading, setUploading]   = React.useState(false)
  const [fileList, setFileList]     = React.useState<UploadFile[]>([])
  const dispatch                    = useAppDispatch()
  const openCompaniesAdditionModal  = useAppSelector((state) => state.modals.openCompaniesAdditionModal)
  const [messageApi, contextHolder] = message.useMessage()

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
    const res = await post(postUrl, filteredResult, cookies.access_token)
    if(fileList[0]){
      uploadPhoto(fileList[0],setUploading, setFileList, `uploadCompanysPhoto?companyName=${values.companyName}`)
    }
    if(!res.error){
      form.resetFields()
      dispatch(setOpenCompaniesAdditionModal(false))
      messageApi.success({
        type:    'success',
        content: 'Įmonė pridėta',
      })
    }else{
      form.resetFields()
      dispatch(setOpenCompaniesAdditionModal(false))
      messageApi.error({
        type:    'error',
        content: 'Pridėti nepavyko',
      })
    }
  }

  return (
    <Modal
      title={additionModalTitle}
      open={openCompaniesAdditionModal}
      onOk={() => dispatch(setOpenCompaniesAdditionModal(false))}
      onCancel={() => dispatch(setOpenCompaniesAdditionModal(false))}
      footer={false}
      width={'1000px'}
    >
      <Form form={form} onFinish={addCompany} style={{textAlign: 'center', width: '100%'}}>
        <div>
          <Form.Item rules={[{ required: true, message: 'Įveskite įmonės pavadinimą'}]} name='companyName'>
            <Input placeholder='Įmonės pavadinimas'/>
          </Form.Item>
          <Form.Item name='companyDescription'>
            <Input placeholder='Įmonės apibūdinimas'/>
          </Form.Item>
          <PhotoUploader setFileList={setFileList} fileList={fileList}/>
          <div style={{display: 'flex', justifyContent: 'space-evenly', width: '100%'}}>
            {collocations?.map((colocation, i) =>
              colocation.premises ?
                <ColocationSelectors
                  key={i}
                  collocationSite={colocation.site}
                  colocationPremises={colocation.premises}
                  colocationId={colocation.id}/>
                : null
            )}
          </div>
        </div>
        <Button style={{margin: '10px'}} loading={uploading} htmlType='submit'>Pridėti</Button>
        <SuccessMessage contextHolder={contextHolder}/>
      </Form>
    </Modal>
  )
}

export default CompanyAdditionModal