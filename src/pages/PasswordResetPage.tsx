/* eslint-disable max-len */
import { Button, Card, Form, Input } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router'

const PasswordResetPage = () => {
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const onFinish = (values:any) => {
    console.log(values)
    navigate('/')
  }

  return (
    <div className='CreateUserContainer'>
      <Card headStyle={{textAlign: 'center'}} title='Atnaujinti slaptažodį' bordered={true} className='LoginPage'>
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
              <Button type='link' style={{textAlign: 'center'}} className='login-form-forgot' href=''>
                Prisijungti
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default PasswordResetPage