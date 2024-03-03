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
  InputNumber,
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
import { setCheckedList }                 from '../../../../auth/RacksReducer/RacksReducer'

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
    try{
      if (fileList && fileList.length > 0) {
        values.photo = fileList[0]
      }

      values.racks = checkedList

      const res    = await post(postUrl, values, cookies.access_token, fileList, setUploading, setFileList)

      if(res.message){
        messageApi.error({
          type:    'error',
          content: 'Only admin can add companies',
        })
      }else{
        messageApi.success({
          type:    'success',
          content: 'Įmonė pridėta',
        })
      }

      form.resetFields(['name', 'companyCode', 'description'])
      dispatch(setOpenCompaniesAdditionModal(false))
      dispatch(setCheckedList([]))

    }catch(error){
      if(error instanceof Error){
        messageApi.error({
          type:    'error',
          content: 'Only admin can add companies',
        })
      }
    }
  }
  const onCancel = () => {
    dispatch(setOpenCompaniesAdditionModal(false))
    form.resetFields(['name', 'companyCode', 'description'])
    dispatch(setCheckedList([]))
  }

  return (
    <Modal
      title={additionModalTitle}
      open={openCompaniesAdditionModal}
      onOk={() => dispatch(setOpenCompaniesAdditionModal(false))}
      onCancel={onCancel}
      footer={false}
      width={'1000px'}
    >
      <Form form={form} onFinish={addCompany} style={{textAlign: 'center', width: '100%'}}>
        <div>
          <Form.Item rules={[{ required: true, message: 'Įveskite įmonės pavadinimą'}]} name='name'>
            <Input placeholder='Įmonės pavadinimas'/>
          </Form.Item>
          <Form.Item rules={[{ required: true, message: 'Įveskite įmonės kodą'}]} name='companyCode'>
            <InputNumber placeholder='Įmonės kodas' style={{ width: '100%' }} />
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