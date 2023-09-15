import React from 'react'
import { Button, Form, Input, Select } from 'antd'
import { useCookies } from 'react-cookie'
import { CompaniesType, UserType } from '../types/globalTypes'
import { get } from '../Plugins/helpers'

const { Option } = Select

const layout = {
  labelCol:   { span: 8 },
  wrapperCol: { span: 16 },
}

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
}

const TestComponent = () => {
  const [cookies] = useCookies(['access_token'])
  const [dlcEmployees, setDlcEmployees] = React.useState<UserType[]>()
  const [allCompanies, setAllCompanies] = React.useState<CompaniesType[]>()
  const [form] = Form.useForm()
  React.useEffect(() => {
    (async () => {
      const companies = await get('getCompanies', cookies.access_token)
      const dlcEmployees = await get('getAllUsers', cookies.access_token)
      setDlcEmployees(dlcEmployees.data)
      setAllCompanies(companies.data)
    })()
  }, [])


  const onFinish = (values: any) => {
    console.log(values)
  }

  const onReset = () => {
    form.resetFields()
  }

  const companyNames = allCompanies?.map((el)=> {
    return { value: el.id, label: el.companyInfo.companyName, info: el.companyInfo}
  })


  const addresses = [
    {
      value: '1',
      label: 'J13',
    },
    {
      value: '2',
      label: 'T72',
    },
  ]
  return (
    <Form
      {...layout}
      form={form}
      name='control-hooks'
      onFinish={onFinish}
      style={{ maxWidth: 600 }}
    >
      <Form.Item name='note' label='Note' rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name='clients' label='Įmonė' rules={[{ required: true }]}>
        <Select
          placeholder='Select a option and change input text above'
          allowClear
          options={companyNames}
        >
        </Select>
      </Form.Item>
      <Form.Item
        noStyle
        shouldUpdate={(prevValues, currentValues) => prevValues.clients !== currentValues.clients}
      >
        {({ getFieldValue }) =>
          getFieldValue('clients') && (
            <Form.Item name='address' label='Įmonė' rules={[{ required: true }]}>
              <Select
                placeholder='Select a option and change input text above'
                allowClear
                options={addresses}
              >
              </Select>
            </Form.Item>
          ) }
      </Form.Item>
      <Form.Item
        noStyle
        shouldUpdate={(prevValues, currentValues) => prevValues.address !== currentValues.address}
      >
        {({ getFieldValue }) =>
          getFieldValue('address') && (
            <Form.Item name='addresses' label='Įmonė' rules={[{ required: true }]}>
              <Select
                placeholder='Select a option and change input text above'
                allowClear
                options={addresses}
              >
              </Select>
            </Form.Item>
          ) }
      </Form.Item>
      <Form.Item {...tailLayout}>
        <Button type='primary' htmlType='submit'>
          Submit
        </Button>
        <Button htmlType='button' onClick={onReset}>
          Reset
        </Button>
      </Form.Item>
    </Form>
  )
}

export default TestComponent