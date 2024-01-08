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
import { CheckboxChangeEvent } from 'antd/es/checkbox'
import useSetCheckedCollocationList from '../../../../Plugins/useSetCheckedCollocationList'

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
  const {
    filteredResult,
    checkedList,
    checkAllStates,
    onCheckAllChange,
    onCheckboxChange,
  }                               = useSetCheckedCollocationList()

  const addCompany = async(values: CompanyFormType) => {
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
              colocation.premises ?
                <ColocationSelectors
                  key={i}
                  collocationSite={colocation.site}
                  colocationPremises={colocation.premises}
                  colocationId={colocation.id}
                  checkedList={checkedList}
                  checkAllStates={checkAllStates}
                  onCheckAllChange={onCheckAllChange}
                  onCheckboxChange={onCheckboxChange}
                />
                : null
            )}
          </div>
        </div>
        <Button loading={uploading} htmlType='submit'>Pridėti</Button>
      </Form>
    </Modal>
  )
}

export default SubClientAdditionModal