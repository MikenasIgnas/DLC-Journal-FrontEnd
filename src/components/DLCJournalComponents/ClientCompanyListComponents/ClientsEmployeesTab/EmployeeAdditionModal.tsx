/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable max-len */
import {
  Button,
  Checkbox,
  ConfigProvider,
  DatePicker,
  Form,
  Input,
  Modal,
  UploadFile,
  message }                             from 'antd'
import { useForm }                      from 'antd/es/form/Form'
import React                            from 'react'
import { useCookies }                   from 'react-cookie'
import { EmployeesType }                from '../../../../types/globalTypes'
import { get, post }                    from '../../../../Plugins/helpers'
import PhotoUploader                    from '../../../UniversalComponents/PhotoUploader/PhotoUploader'
import { useAppDispatch }               from '../../../../store/hooks'
import { setOpenEmployeeAdditionModal } from '../../../../auth/ModalStateReducer/ModalStateReducer'
import { useParams }                    from 'react-router'
import SuccessMessage                   from '../../../UniversalComponents/SuccessMessage'

import locale           from 'antd/es/locale/lt_LT'
import 'dayjs/locale/lt'
const { TextArea } = Input

type EmployeesAdditionModal = {
  urlPath:       string;
}

const EmployeesAdditionModal = ({urlPath}: EmployeesAdditionModal) => {
  const [form]                        = useForm()
  const [cookies]                     = useCookies(['access_token'])
  const [uploading, setUploading]     = React.useState(false)
  const [fileList, setFileList]       = React.useState<UploadFile[]>([])
  const dispatch                      = useAppDispatch()
  const {id}                          = useParams()
  const [permissions, setPermissions] = React.useState([])
  const [messageApi, contextHolder]   = message.useMessage()

  React.useEffect(() => {
    (async () => {
      try{
        const res       = await get('company/permission', cookies.access_token)
        const formattedPermissions = res.map((permission: { name: string; _id: string }) => ({
          label: permission.name,
          value: permission._id,
        }))
        setPermissions(formattedPermissions)
      }catch(err){
        console.log(err)
      }
    })()
  },[])

  const addEmployees = async(values: EmployeesType) => {
    if(id){
      try{
        values.companyId = id
        values.isDisabled = false
        await post(urlPath, values, cookies.access_token, fileList[0], setUploading, setFileList)
        dispatch(setOpenEmployeeAdditionModal(false))
        messageApi.success({
          type:    'success',
          content: 'Darbuotojas pridėta',
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
        <Form.Item rules={[{ required: true, message: 'Įveskite darbuotojo pavardę'}]} name='lastname'>
          <Input placeholder='Darbuotojo pavardė'/>
        </Form.Item>
        <ConfigProvider locale={locale}>
          <Form.Item rules={[{ required: true, message: 'Įveskite darbuotojo gimimo metus'}]} name='birthday'>
            <DatePicker style={{width: '100%'}} placeholder='Darbuotojo gimimo data' />
          </Form.Item>
        </ConfigProvider>
        <Form.Item rules={[{ required: true, message: 'Įveskite darbuotojo pavardę'}]} name='occupation'>
          <Input placeholder='Darbuotojo pareigos'/>
        </Form.Item>
        <Form.Item rules={[{ required: true, message: 'Įveskite darbuotojo telefono numerį'}]} name='phone'>
          <Input placeholder='Darbuotojo tel. nr.'/>
        </Form.Item>
        <Form.Item rules={[{ required: true, message: 'Įveskite darbuotojo el. paštą'}]} name='email'>
          <Input placeholder='Darbuotojo el. paštas'/>
        </Form.Item>
        <Form.Item name='note'>
          <TextArea placeholder='Pastabos'/>
        </Form.Item>
        <Form.Item rules={[{ required: true, message: 'Pasirinkite darbuotojo teises'}]} name='permissions'>
          <Checkbox.Group options={permissions}/>
        </Form.Item>
        <PhotoUploader setFileList={setFileList} fileList={fileList}/>
        <Button loading={uploading} htmlType='submit'>Pridėti</Button>
      </Form>
      <SuccessMessage contextHolder={contextHolder}/>
    </Modal>
  )
}

export default EmployeesAdditionModal