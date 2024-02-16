/* eslint-disable max-len */
import {  UserOutlined }                        from '@ant-design/icons'
import { Button, Card, Form, Input , message }  from 'antd'
import { useNavigate }                          from 'react-router'

const SendRecoveryCodePage = () => {
  const [form]    = Form.useForm()
  const navigate  = useNavigate()

  const onFinish = () => {
    message.success('Laiškas su patvirtinimo kodu išsiųstas el. paštu')
    form.resetFields()
    navigate('/RecoveryCodeConfirmationPage')
  }

  return (
    <div className='CreateUserContainer'>
      <Card styles={{header: {textAlign: 'center'}}} title='Slaptažodžio atstatymas' bordered={true} className='LoginPage'>
        <Form
          form={form}
          name='normal_login'
          onFinish={onFinish}
        >
          <Form.Item
            name='email'
            rules={[
              { required: true, message: 'Įveskite el. paštą' },
            ]}
          >
            <Input prefix={<UserOutlined rev='' className='site-form-item-icon' />} placeholder='Email' />
          </Form.Item>
          <Form.Item className='loginButtons'>
            <div style={{display: 'flex', flexDirection: 'column'}}>
              <Button type='primary' htmlType='submit' className='login-form-button'>
                Siusti El. Laišką
              </Button>
              <Button onClick={() => navigate('/')} type='link' style={{textAlign: 'center'}} className='login-form-forgot' href=''>
                Prisijungti
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default SendRecoveryCodePage