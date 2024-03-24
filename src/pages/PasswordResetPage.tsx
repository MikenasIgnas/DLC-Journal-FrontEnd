/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-len */
import {
  Button,
  Card,
  Form,
  Input,
  message,
}                       from 'antd'

import { useNavigate }  from 'react-router'
import SuccessMessage   from '../components/UniversalComponents/SuccessMessage'
import { useCookies }   from 'react-cookie'
import { post }          from '../Plugins/helpers'
import { useSearchParams } from 'react-router-dom'

type Values = {
  password:       string;
  repeatPassword: string
}

const PasswordResetPage = () => {
  const [form]                      = Form.useForm()
  const navigate                    = useNavigate()
  const [messageApi, contextHolder] = message.useMessage()
  const [cookies]                   = useCookies(['recovery_token'])
  const [searchParams]              = useSearchParams()

  const token = searchParams.get('token')




  const onFinish = async(values: Values) => {
    try{
      const updateValues =  {
        password:       values.password,
        repeatPassword: values.repeatPassword,
        token:          token,
      }
      const res = await post('auth/resetPassword', updateValues , cookies.recovery_token)

      messageApi.success({
        content: res.message,
        type:    'success',
      })

      form.resetFields()
      setTimeout(() => {
        navigate('/')
      }, 1000)
    }catch(error){
      if(error instanceof Error){
        messageApi.error({
          content: error.message,
          type:    'error',
        })
      }
    }
  }

  return (
    <div className='CreateUserContainer'>
      <Card styles={{header: {textAlign: 'center'}}} title='Atnaujinti slaptažodį' bordered={true} className='LoginPage'>
        <Form form={form} onFinish={onFinish}>
          <div>
            <Form.Item
              rules={[{required: true, message: 'Privaloma įvesti naują slaptažodį'}]}
              labelAlign='left'
              name='password'
              hasFeedback
            >
              <Input.Password placeholder='Slaptažodis'/>
            </Form.Item>
            <Form.Item
              labelAlign='left'
              name='repeatPassword'
              dependencies={['password']}
              hasFeedback
              rules={[
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve()
                    }
                    return Promise.reject(new Error('Slaptažodžiai nesutampa'))
                  },
                }),
                {required: true},
              ]}
            >
              <Input.Password placeholder='Pakartoti slaptažodį'/>
            </Form.Item>
          </div>
          <Form.Item className='loginButtons'>
            <div style={{display: 'flex', flexDirection: 'column'}}>
              <Button type='primary' htmlType='submit' className='login-form-button'>
                Patvirtinti
              </Button>
              <Button type='link' style={{textAlign: 'center'}} className='login-form-forgot' onClick={() => navigate('/')}>
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

export default PasswordResetPage