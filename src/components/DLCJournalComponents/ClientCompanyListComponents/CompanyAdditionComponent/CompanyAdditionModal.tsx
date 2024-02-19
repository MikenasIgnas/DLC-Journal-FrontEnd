/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-len */
import React                              from 'react'
import {
  Modal,
  Form,
  Button,
  Input,
  UploadFile,
  message,
}                                         from 'antd'

import { useForm }                        from 'antd/es/form/Form'
import PhotoUploader                      from '../../../UniversalComponents/PhotoUploader/PhotoUploader'
import ColocationSelectors                from '../ClientsCollocationsTab/CollocationSelectors'

import {
  useAppDispatch,
  useAppSelector,
}                                         from '../../../../store/hooks'

import { setOpenCompaniesAdditionModal }  from '../../../../auth/ModalStateReducer/ModalStateReducer'
import SuccessMessage                     from '../../../UniversalComponents/SuccessMessage'
import { post }                           from '../../../../Plugins/helpers'
import { useCookies }                     from 'react-cookie'

type AdditionModalProps = {
  postUrl:            string;
  additionModalTitle: string;
}

type CompanyFormType = {
  name?:           string,
  description?:    string,
  racks:           string[]
  photo?:          any,
};

const CompanyAdditionModal = ({postUrl, additionModalTitle}: AdditionModalProps) => {
  const [form]                      = useForm()
  const [uploading, setUploading]   = React.useState(false)
  const [cookies]                   = useCookies(['access_token'])
  const [fileList, setFileList]     = React.useState<UploadFile[]>([])
  const dispatch                    = useAppDispatch()
  const openCompaniesAdditionModal  = useAppSelector((state) => state.modals.openCompaniesAdditionModal)
  const [messageApi, contextHolder] = message.useMessage()
  const sites                       = useAppSelector((state) => state.sites.fullSiteData)
  const checkedList                 = useAppSelector((state) => state.racks.checkedList)

  const addCompany = async(values: CompanyFormType) => {
    values.racks = checkedList
    if(checkedList.length <= 0 || checkedList.length <= 0 ){
      messageApi.error({
        type:    'error',
        content: 'Privaloma pasirinkti kolokaciją',
      })
    }else{
      try{
        if (fileList && fileList.length > 0) {
          values.photo = fileList[0]
        }

        await post(postUrl, values, cookies.access_token, fileList, setUploading, setFileList)

        form.resetFields()
        dispatch(setOpenCompaniesAdditionModal(false))

        messageApi.success({
          type:    'success',
          content: 'Įmonė pridėta',
        })
      }catch(error){
        if(error instanceof Error){
          messageApi.error({
            type:    'error',
            content: error.message,
          })
        }
      }
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
          <Form.Item rules={[{ required: true, message: 'Įveskite įmonės pavadinimą'}]} name='name'>
            <Input placeholder='Įmonės pavadinimas'/>
          </Form.Item>
          <Form.Item rules={[{ required: true, message: 'Įveskite įmonės kodą'}]} name='companyCode'>
            <Input placeholder='Įmonės kodas'/>
          </Form.Item>
          <Form.Item name='description'>
            <Input placeholder='Įmonės apibūdinimas'/>
          </Form.Item>
          <PhotoUploader setFileList={setFileList} fileList={fileList}/>
          <div style={{display: 'flex', justifyContent: 'space-evenly', width: '100%'}}>
            {sites?.map((item, i) => <ColocationSelectors key={i} item={item}/>)}
          </div>
        </div>
        <Button style={{margin: '10px'}} loading={uploading} htmlType='submit'>Pridėti</Button>
        <SuccessMessage contextHolder={contextHolder}/>
      </Form>
    </Modal>
  )
}

export default CompanyAdditionModal