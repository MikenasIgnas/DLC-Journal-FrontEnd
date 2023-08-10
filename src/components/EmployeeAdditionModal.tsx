/* eslint-disable max-len */
import { Button, Checkbox, Form, Input, Modal } from 'antd'
import { CheckboxValueType } from 'antd/es/checkbox/Group'
import { useForm } from 'antd/es/form/Form'
import React from 'react'
import { useCookies } from 'react-cookie'
import { post } from '../Plugins/helpers'
import { useParams } from 'react-router-dom'

type EmployeesAdditionModal = {
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const EmployeesAdditionModal = ({setIsModalOpen}: EmployeesAdditionModal) => {
  const [form] =    useForm()
  const [cookies] = useCookies(['access_token'])
  const {id} = useParams()
  const addEmployees = async(values: any) => {
    values.companyId = id
    await post('addEmployee', values, cookies.access_token)
    setIsModalOpen(false)
  }

  const permissions = ['Įnešti įrangą', 'Išnešti įrangą', 'Komutavimas', 'Konfiguracija', 'Įleisti Trečius asmenis']

  return (
    <Modal
      title='Pridėkite įmonės darbuotoją'
      centered
      open
      onOk={() => setIsModalOpen(false)}
      onCancel={() => setIsModalOpen(false)}
      footer={false}
    >
      <Form form={form} onFinish={addEmployees}>
        <Form.Item rules={[{ required: true, message: 'Įveskite darbuotojo vardą'}]} name='name'>
          <Input placeholder='Darbuotojo vardas'/>
        </Form.Item>
        <Form.Item rules={[{ required: true, message: 'Įveskite darbuotojo pavardę'}]} name='lastName'>
          <Input placeholder='Darbuotojo pavardė'/>
        </Form.Item>
        <Form.Item rules={[{ required: true, message: 'Įveskite darbuotojo pavardes'}]} name='occupation'>
          <Input placeholder='Darbuotojo pareigos'/>
        </Form.Item>
        <Form.Item rules={[{ required: true, message: 'Pasirinkite darbuotojo teises'}]} name='permissions'>
          <Checkbox.Group options={permissions}/>
        </Form.Item>
        <Button htmlType='submit'>Pridėti</Button>
      </Form>
    </Modal>
  )
}

export default EmployeesAdditionModal