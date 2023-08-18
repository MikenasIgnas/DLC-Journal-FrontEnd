/* eslint-disable max-len */
import { Button, Checkbox, Form, Input, Modal, UploadFile, message } from 'antd'
import { useForm } from 'antd/es/form/Form'
import React from 'react'
import { useCookies } from 'react-cookie'
import { post, uploadPhoto } from '../Plugins/helpers'
import { useParams } from 'react-router-dom'
import CompanyPhotoUploader from './companyAdditionComponent/CompanyPhotoUploader'
import { RcFile } from 'antd/es/upload'
import { EmployeesType } from '../types/globalTypes'

type EmployeesAdditionModal = {
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const EmployeesAdditionModal = ({setIsModalOpen}: EmployeesAdditionModal) => {
  const [form] =                    useForm()
  const [cookies] =                 useCookies(['access_token'])
  const {id}      =                 useParams()
  const [uploading, setUploading] = React.useState(false)
  const [fileList, setFileList] =   React.useState<UploadFile[]>([])

  const addEmployees = async(values: EmployeesType) => {
    console.log(values)
    values.companyId = id
    await post('addEmployee', values, cookies.access_token)
    uploadPhoto(fileList[0],setUploading, setFileList, 'uploadCompanysPhoto' )
    setIsModalOpen(false)
  }

  const permissions = ['Įnešti įrangą', 'Išnešti įrangą', 'Komutavimas', 'Konfiguracija', 'Įleisti Trečius asmenis']
  const { TextArea } = Input
  return (
    <Modal
      title='Pridėkite įmonės darbuotoją'
      centered
      open
      onOk={() => setIsModalOpen(false)}
      onCancel={() => setIsModalOpen(false)}
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
          <Input placeholder='Darbuotojo gimimo data'/>
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
        <CompanyPhotoUploader setFileList={setFileList} fileList={fileList}/>
        <Button loading={uploading} htmlType='submit'>Pridėti</Button>
      </Form>
    </Modal>
  )
}

export default EmployeesAdditionModal