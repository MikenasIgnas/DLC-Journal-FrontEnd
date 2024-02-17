/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-len */
import React                                                from 'react'
import { Modal, Form, Button, Input, UploadFile, message }  from 'antd'
import { useForm }                                          from 'antd/es/form/Form'
import PhotoUploader                                        from '../../../UniversalComponents/PhotoUploader/PhotoUploader'
import ColocationSelectors                                  from '../ClientsCollocationsTab/CollocationSelectors'
import { useAppDispatch, useAppSelector }                   from '../../../../store/hooks'
import { setOpenCompaniesAdditionModal }                    from '../../../../auth/ModalStateReducer/ModalStateReducer'
import SuccessMessage                                       from '../../../UniversalComponents/SuccessMessage'
import useSetCheckedCollocationList                         from '../../../../Plugins/useSetCheckedCollocationList'
import { post } from '../../../../Plugins/helpers'
import { useCookies } from 'react-cookie'

type AdditionModalProps = {
    postUrl:            string;
    additionModalTitle: string;
}

type CompanyFormType = {
  name?:           string,
  description?:    string,
  racks:           string[]
  photo?:          any,
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

const CompanyAdditionModal = ({postUrl, additionModalTitle}: AdditionModalProps) => {
  const [form]                      = useForm()
  const [uploading, setUploading]   = React.useState(false)
  const [cookies]                   = useCookies(['access_token'])
  const [fileList, setFileList]     = React.useState<UploadFile[]>([])
  const dispatch                    = useAppDispatch()
  const openCompaniesAdditionModal  = useAppSelector((state) => state.modals.openCompaniesAdditionModal)
  const [messageApi, contextHolder] = message.useMessage()
  const sites                       = useAppSelector((state) => state.sites.fullSiteData)
  const {
    checkboxList, checkAllStates, onCheckAllChange, onCheckboxChange, setCheckboxList,
  } = useSetCheckedCollocationList()

  const addCompany = async(values: CompanyFormType) => {
    values.racks = checkboxList.checkedList
    if(checkboxList.checkedList.length <= 0 || checkboxList.checkedList && checkboxList.checkedList.length <= 0 ){
      messageApi.error({
        type:    'error',
        content: 'Privaloma pasirinkti kolokaciją',
      })
    }else{
      if (fileList && fileList.length > 0) {
        values.photo = fileList[0]
      }

      const res = await post(postUrl, values, cookies.access_token, fileList, setUploading, setFileList)
      if(!res.error){
        form.resetFields()
        dispatch(setOpenCompaniesAdditionModal(false))
        setCheckboxList({checkedList: [],checkAllStates: {}})
        messageApi.success({
          type:    'success',
          content: 'Įmonė pridėta',
        })
      }else{
        form.resetFields()
        dispatch(setOpenCompaniesAdditionModal(false))
        setCheckboxList({checkedList: [],checkAllStates: {}})
        messageApi.error({
          type:    'error',
          content: 'Pridėti nepavyko',
        })
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
          {/* <Form.Item rules={[{ required: true, message: 'Įveskite įmonės kodą'}]} name='companyCode'>
            <Input placeholder='Įmonės kodas'/>
          </Form.Item> */}
          <Form.Item name='description'>
            <Input placeholder='Įmonės apibūdinimas'/>
          </Form.Item>
          <PhotoUploader setFileList={setFileList} fileList={fileList}/>
          <div style={{display: 'flex', justifyContent: 'space-evenly', width: '100%'}}>
            {sites?.map((item, i) =>
              <ColocationSelectors
                checkboxList={checkboxList.checkedList}
                onCheckboxChange={onCheckboxChange}
                checkAllStates={checkAllStates}
                onCheckAllChange={onCheckAllChange}
                key={i}
                item={item}
              />
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