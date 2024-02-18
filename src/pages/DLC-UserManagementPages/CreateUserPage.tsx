/* eslint-disable max-len */
import { Button, Card, Checkbox, Form, Input, message } from 'antd'
import React                                            from 'react'
import { getCurrentDate, post }                         from '../../Plugins/helpers'
import { useCookies }                                   from 'react-cookie'
import SuccessMessage                                   from '../../components/UniversalComponents/SuccessMessage'

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
}

type FormValuesType = {
    username:     string,
    email:        string,
    idAdmin:      boolean,
    passwordOne:  string,
    passwordTwo:  string,
    status:       string,
    dateCreated:  string,
}

const CreateUserPage = () => {
  const [form]                          = Form.useForm()
  const [messageApi, contextHolder]     = message.useMessage()
  const [cookies]                       = useCookies(['access_token'])
  const onFinish = async (values: FormValuesType) => {
    try{
      values.dateCreated = getCurrentDate()
      await post('user', values, cookies.access_token)
      messageApi.success({
        type:    'success',
        content: 'Išsaugota',
      })
      form.resetFields()
    }catch(error){
      if(error instanceof Error){
        messageApi.error({
          type:    'error',
          content: error.message,
        })
      }
    }
  }

  return (
    <div className='CreateUserPageContainer'>
      <Card
        title='Sukurti darbuotoją'
        bordered={true}
        className='CreateUserCard'>
        <Form
          {...formItemLayout}
          form={form}
          name='createUser'
          onFinish={onFinish}
          className='Form'
          scrollToFirstError
        >
          <Form.Item
            labelAlign='left'
            name='name'
            label='Darbuotojas'
            rules={[{ required: true, message: 'Please input users name!', whitespace: true }]}
          >
            <Input placeholder='Darbuotojo vardas/pavardė'/>
          </Form.Item>
          <Form.Item
            labelAlign='left'
            name='username'
            label='Prisijungimas'
            rules={[{ required: true, message: 'Please input username!', whitespace: true }]}
          >
            <Input placeholder='Prisijungimas'/>
          </Form.Item>
          <Form.Item
            labelAlign='left'
            name='email'
            label='E-mail'
            rules={[
              {
                type:    'email',
                message: 'The input is not valid E-mail!',
              },
              {
                required: true,
                message:  'Please input your E-mail!',
              },
            ]}
          >
            <Input placeholder='Darbuotojo el. paštas'/>
          </Form.Item>
          <Form.Item
            label='Rolė'
            labelAlign='left'
            initialValue={false}
            name='isAdmin'
            valuePropName='checked'
          >
            <Checkbox>Admin</Checkbox>
          </Form.Item>
          <Form.Item
            colon={false}
            label=' '
            labelAlign='left'
            initialValue={false}
            name='isSecurity'
            valuePropName='checked'
          >
            <Checkbox>Apsauga</Checkbox>
          </Form.Item>
          <Form.Item
            labelAlign='left'
            name='password'
            label='Slaptažodis'
            rules={[
              {
                required: true,
                message:  'Please input your password!',
              },
            ]}
            hasFeedback
          >
            <Input.Password placeholder='Slaptažodis' />
          </Form.Item>
          <Form.Item
            labelAlign='left'
            name='repeatPassword'
            label='Patvirtinti slaptažodį'
            dependencies={['password']}
            hasFeedback
            rules={[
              {
                required: true,
                message:  'Patvirtinkit slaptažodį',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve()
                  }
                  return Promise.reject(new Error('Slaptažodžiai nesutampa'))
                },
              }),
            ]}
          >
            <Input.Password placeholder='Pakartoti slaptažodį'/>
          </Form.Item>
          <Button htmlType='submit'>
              Sukurti
          </Button>
        </Form>
      </Card>
      <SuccessMessage contextHolder={contextHolder} />
    </div>
  )
}

export default CreateUserPage