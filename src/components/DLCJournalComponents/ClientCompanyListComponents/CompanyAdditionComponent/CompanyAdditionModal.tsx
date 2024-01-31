/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-len */
import React                                                from 'react'
import { Modal, Form, Button, Input, UploadFile, message }  from 'antd'
import { useForm }                                          from 'antd/es/form/Form'
import { post }                                             from '../../../../Plugins/helpers'
import { useCookies }                                       from 'react-cookie'
import PhotoUploader                                        from '../../../UniversalComponents/PhotoUploader/PhotoUploader'
import ColocationSelectors                                  from '../ClientsCollocationsTab/CollocationSelectors'
import { CollocationsType }                                 from '../../../../types/globalTypes'
import { useAppDispatch, useAppSelector }                   from '../../../../store/hooks'
import { setOpenCompaniesAdditionModal }                    from '../../../../auth/ModalStateReducer/ModalStateReducer'
import SuccessMessage                                       from '../../../UniversalComponents/SuccessMessage'
import useSetCheckedCollocationList                         from '../../../../Plugins/useSetCheckedCollocationList'

type AdditionModalProps = {
    postUrl:            string;
    additionModalTitle: string;
    collocations:       CollocationsType[] | undefined
}

type CompanyFormType = {
  name?:           string,
  description?:    string,
  photo?:          string,
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
  const [cookies]                                                           = useCookies(['access_token'])
  const [form]                                                              = useForm()
  const [uploading, setUploading]                                           = React.useState(false)
  const [fileList, setFileList]                                             = React.useState<UploadFile[]>([])
  const dispatch                                                            = useAppDispatch()
  const openCompaniesAdditionModal                                          = useAppSelector((state) => state.modals.openCompaniesAdditionModal)
  const [messageApi, contextHolder]                                         = message.useMessage()
  const {
    filteredResult,
    setCheckboxList,
    checkedList,
    checkAllStates,
    onCheckAllChange,
    onCheckboxChange,
  } = useSetCheckedCollocationList()

  const addCompany = async(values: CompanyFormType) => {
    if(filteredResult?.J13?.length && filteredResult?.J13?.length <= 0 || filteredResult?.T72?.length && filteredResult?.T72?.length <= 0 ){
      messageApi.error({
        type:    'error',
        content: 'Privaloma pasirinkti kolokaciją',
      })
    }else{
      filteredResult.name = values.name
      filteredResult.description = values.description
      if (fileList && fileList.length > 0) {
        filteredResult.photo = fileList[0]
      }

      const res = await post(postUrl, filteredResult, cookies.access_token, fileList, setUploading, setFileList)
      if(!res.error){
        form.resetFields()
        dispatch(setOpenCompaniesAdditionModal(false))
        setCheckboxList({checkedList: {}, checkAllStates: {}})
        messageApi.success({
          type:    'success',
          content: 'Įmonė pridėta',
        })
      }else{
        form.resetFields()
        dispatch(setOpenCompaniesAdditionModal(false))
        setCheckboxList({checkedList: {}, checkAllStates: {}})
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
            {collocations?.map((colocation, i) =>
              colocation.premises ?
                <ColocationSelectors
                  checkedList={checkedList}
                  checkAllStates={checkAllStates}
                  onCheckAllChange={onCheckAllChange}
                  onCheckboxChange={onCheckboxChange}
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