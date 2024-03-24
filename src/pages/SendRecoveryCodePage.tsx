/* eslint-disable max-len */
import {  UserOutlined }  from '@ant-design/icons'
import {
  Button,
  Card,
  Form,
  Input,
  message,
}                         from 'antd'
import { useCookies }     from 'react-cookie'
import { useNavigate }    from 'react-router'
import SuccessMessage     from '../components/UniversalComponents/SuccessMessage'
import axios              from 'axios'
import { sendRecoveryCode } from '../Plugins/helpers'

const SendRecoveryCodePage = () => {
  const [form]                      = Form.useForm()
  const navigate                    = useNavigate()
  const [, setCookie]        = useCookies(['recovery_token'])
  const [messageApi, contextHolder] = message.useMessage()

  const onFinish = async(values: {email: string}) => {
    try{
      const res = await sendRecoveryCode('sendPasswordRecovery', { email: values.email })
      setCookie('recovery_token', res.token, { path: '/'})
      axios.defaults.headers.common['Authorization'] = res.token
      form.resetFields()
      messageApi.success({
        content: 'Laiškas su nuoroda išsiųstas',
        type:    'success',
      })

      setTimeout(() => {
        navigate('/')
      }, 1000)
    }catch(error){
      console.log(error)
      if (error instanceof Error){
        messageApi.error({
          content: error.message,
          type:    'error',
        })
      }
    }
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
      <SuccessMessage contextHolder={contextHolder} />
    </div>
  )
}

export default SendRecoveryCodePage