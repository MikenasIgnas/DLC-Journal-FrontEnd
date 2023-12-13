/* eslint-disable max-len */
import { Button, Checkbox, DatePicker, Form, Input, Modal, UploadFile } from 'antd'
import { useForm }                                                      from 'antd/es/form/Form'
import React                                                            from 'react'
import { useCookies }                                                   from 'react-cookie'
import { EmployeesType }                                                from '../../../../types/globalTypes'
import { post, uploadPhoto }                                            from '../../../../Plugins/helpers'
import PhotoUploader                                                    from '../../../UniversalComponents/PhotoUploader/PhotoUploader'
import { useAppDispatch }                                               from '../../../../store/hooks'
import { setOpenEmployeeAdditionModal }                                 from '../../../../auth/ModalStateReducer/ModalStateReducer'

type EmployeesAdditionModal = {
    companyName:   string | undefined;
    companyId:     number | null;
    urlPath:       string;
}

const EmployeesAdditionModal = ({ companyName, companyId, urlPath}: EmployeesAdditionModal) => {
  const [form]                    = useForm()
  const [cookies]                 = useCookies(['access_token'])
  const [uploading, setUploading] = React.useState(false)
  const [fileList, setFileList]   = React.useState<UploadFile[]>([])
  const dispatch                  = useAppDispatch()
  const addEmployees = async(values: EmployeesType) => {
    if(companyId){
      values.companyId = companyId
      values.employeePhoto = ''
      await post(urlPath, values, cookies.access_token)
      if(fileList[0]){
        uploadPhoto(fileList[0], setUploading, setFileList, `uploadCliesntEmployeesPhoto?companyName=${companyName}&companyId=${companyId}`)
      }
      dispatch(setOpenEmployeeAdditionModal(false))
    }
  }

  const permissions = ['Įnešti įrangą', 'Išnešti įrangą', 'Komutavimas', 'Konfiguracija', 'Įleisti Trečius asmenis']
  const { TextArea } = Input
  return (
    <Modal
      title='Pridėkite įmonės darbuotoją'
      centered
      open
      onOk={() => dispatch(setOpenEmployeeAdditionModal(false))}
      onCancel={() => dispatch(setOpenEmployeeAdditionModal(false))}
      footer={false}
      style={{textAlign: 'center'}}
    >
      <Form form={form} onFinish={addEmployees}>
        <Form.Item rules={[{ required: true, message: 'Įveskite darbuotojo vardą'}]} name='name'>
          <Input placeholder='Darbuotojo vardas'/>
        </Form.Item>
        <Form.Item rules={[{ required: true, message: 'Įveskite darbuotojo pavardę'}]} name='lastName'>
          <Input placeholder='Darbuotojo pavardė'/>
        </Form.Item>
        <Form.Item rules={[{ required: true, message: 'Įveskite darbuotojo gimimo metus'}]} name='birthday'>
          <DatePicker style={{width: '100%'}} placeholder='Darbuotojo gimimo data' />
        </Form.Item>
        <Form.Item rules={[{ required: true, message: 'Įveskite darbuotojo pavardę'}]} name='occupation'>
          <Input placeholder='Darbuotojo pareigos'/>
        </Form.Item>
        <Form.Item rules={[{ required: true, message: 'Įveskite darbuotojo telefono numerį'}]} name='phoneNr'>
          <Input placeholder='Darbuotojo tel. nr.'/>
        </Form.Item>
        <Form.Item rules={[{ required: true, message: 'Įveskite darbuotojo el. paštą'}]} name='email'>
          <Input placeholder='Darbuotojo el. paštas'/>
        </Form.Item>
        <Form.Item name='notes'>
          <TextArea placeholder='Pastabos'/>
        </Form.Item>
        <Form.Item rules={[{ required: true, message: 'Pasirinkite darbuotojo teises'}]} name='permissions'>
          <Checkbox.Group options={permissions}/>
        </Form.Item>
        <PhotoUploader setFileList={setFileList} fileList={fileList}/>
        <Button loading={uploading} htmlType='submit'>Pridėti</Button>
      </Form>
    </Modal>
  )
}

export default EmployeesAdditionModal